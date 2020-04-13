import json
import logging
import os
import time
import uuid
import hashlib

import boto3
dynamodb = boto3.resource('dynamodb')
s3 = boto3.resource('s3')

def dbstream(event, context):
    #print(event)
    #print(os.environ['DYNAMODB_TABLE'])
    bucket = os.environ['DYNAMODB_TABLE']

    md = hashlib.md5();
    
    for record in event['Records']:
        prid = record['dynamodb']['NewImage']['uid']['S']
        orid = record['dynamodb']['NewImage']['org']['S']
        trid = record['dynamodb']['NewImage']['etype']['S']
        
        prid = str(prid+'yabba').encode('utf-8');
        md.update(prid)
        prid = md.hexdigest()
        eid = record['eventID']

        pfilename = "{}/{}/{}.json".format(prid,trid,eid)
        ofilename = "{}/{}/{}.json".format(orid,trid,eid)

        #print(pfilename)
        #print(ofilename)
        

        pobject = s3.Object(bucket, pfilename)
        pobject.put(Body=(bytes(json.dumps(record).encode('UTF-8'))))

        oobject = s3.Object(bucket, ofilename)
        oobject.put(Body=(bytes(json.dumps(record).encode('UTF-8'))))

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
