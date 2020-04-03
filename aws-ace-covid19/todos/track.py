import json
import logging
import os
import time
import uuid

import boto3
dynamodb = boto3.resource('dynamodb')


def track(event, context):
    etype="TRACK"
    data = json.loads(event['body'])
    if 'crc' not in data or 'uid' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")
    
    timestamp = str(time.time())

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    item = {
        'id': data['uid'],
        'etype': etype,
        'crc': data['crc'],
        'uid': data['uid'],
        'latlng': data['latlng'],
        'trackpoint': data['trackpoint'],
        'datetime': data['datetime'],
        'maplink': data['maplink'],
        'radius': data['radius'],
        'checked': False,
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
