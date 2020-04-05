import json
import logging
import os
import time
import uuid
import hashlib
import boto3


from todos import decimalencoder
dynamodb = boto3.resource('dynamodb')

def create(event, context):

    etype="IDENTITY"
    data = json.loads(event['body'])
    
    if 'crc' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")

    md = hashlib.md5();
    vCrc = data['crc']
    vTst = str(data['email']+'yabba').encode('utf-8');
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

    result = table.get_item(
        Key={
            'id': data['email']
        }
    )
    if 'Item' in result :
        dRec = result['Item']
        dRec['email']='ERROR@ERROR.ERROR'
        response = {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*",
                "Access-Control-Allow-Headers":"*"
            },
            "body": json.dumps(dRec,cls=decimalencoder.DecimalEncoder)
        }
        return response

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
