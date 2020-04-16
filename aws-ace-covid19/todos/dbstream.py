import json
import logging
import os
import time
import uuid
import hashlib

import boto3
dynamodb = boto3.resource('dynamodb')
s3 = boto3.resource('s3')
from datetime import datetime

def dbstream(event, context):
    #print(event)
    #print(os.environ['DYNAMODB_TABLE'])
    bucket = os.environ['DYNAMODB_TABLE']

    md = hashlib.md5();
    
    for record in event['Records']:
        prid = record['dynamodb']['NewImage']['uid']['S']
        orid = record['dynamodb']['NewImage']['org']['S']
        trid = record['dynamodb']['NewImage']['etype']['S']
        eid = record['eventID']
        data = record['dynamodb']['NewImage']
  
        print(data)
        l=[]
        for key in data.keys():
            if 'S' in data[key]:
                data[key] = data[key]['S']
            elif 'BOOL' in data[key]:
                data[key] = data[key]['BOOL']
            
            if 'datetime' == key :
                dt = datetime.fromtimestamp(int(data[key])/1000.0)
                data[key] = "{}:{}:{}".format(dt.day,dt.month,dt.year)
            elif 'latlng' == key :
                l = data[key].split(',')
        data['lat']=float(l[0])
        data['lng']=float(l[1])      
                

          
        print(data)
  
        prid = str(prid+'yabba').encode('utf-8');
        md.update(prid)
        prid = md.hexdigest()

        prid=prid.replace(" ", "_")
        orid=orid.replace(" ", "_")
        trid=trid.replace(" ", "_")

        pfilename = "{}/{}/{}.json".format(trid,prid,eid)
        ofilename = "{}/{}/{}.json".format(trid,orid,eid)

        #print(pfilename)
        #print(ofilename)
        

        pobject = s3.Object(bucket, pfilename)
        pobject.put(Body=(bytes(json.dumps(data).encode('UTF-8'))))

        oobject = s3.Object(bucket, ofilename)
        oobject.put(Body=(bytes(json.dumps(data).encode('UTF-8'))))

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": "Hello"
    }

    return response
