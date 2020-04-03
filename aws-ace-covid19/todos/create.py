import json
import logging
import os
import time
import uuid

import boto3
dynamodb = boto3.resource('dynamodb')


def create(event, context):
    etype="IDENTITY"
    data = json.loads(event['body'])
    if 'crc' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")
    
    timestamp = str(time.time())

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    item = {
        'id': data['email'],
        'etype': etype,
        'crc': data['crc'],
        'uid': data['email'],
        'name': data['name'],
        'email': data['email'],
        'sword': data['sword'],
        'mobile': data['mobile'],
        'device': data['device'],
        'org': data['org'],
        'homelatlng': data['homelatlng'],
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
