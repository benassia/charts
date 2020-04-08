import json
import logging
import os
import time
import uuid
import hashlib

import boto3
dynamodb = boto3.resource('dynamodb')


def observation(event, context):
    etype="OBSERVATION"
    data = json.loads(event['body'])
    if 'crc' not in data or 'uid' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")


    md = hashlib.md5();
    vCrc = data['crc']
    vTst = str(data['uid']+'yabba').encode('utf-8');
    md.update(vTst)
    vHash = md.hexdigest()
    
    if(vCrc != vHash):
        response = {
            "statusCode": 502,
            "headers": {
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*",
                "Access-Control-Allow-Headers":"*"
            },
            "body": ""
        }
        return response
    





    timestamp = str(time.time())

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    item = {
        'id': data['id'],
        'etype': etype,
        'crc': data['crc'],
        'uid': data['uid'],        
        'record': data['record'],
        'status': data['status'],
        'activity': data['activity'],
        'temp': data['temp'],
        'org': data['org'],
        'symptom': data['symptom'],
        'latlng': data['latlng'],
        'notes': data['notes'],
        'bstate': data['bstate'],
        'datetime':data['datetime'],
        'checked': data['checked'],
        'createdAt': timestamp,
        'updatedAt': timestamp,
    }

    # write the todo to the database
    table.put_item(Item=item)

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": json.dumps(item)
    }

    return response
