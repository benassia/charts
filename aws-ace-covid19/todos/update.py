import json
import time
import logging
import os
import hashlib

from todos import decimalencoder
import boto3
dynamodb = boto3.resource('dynamodb')


def update(event, context):
      
    data = json.loads(event['body'])
    if 'crc' not in data or 'checked' not in data  or 'uid' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't update the todo item.")
        return

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



    timestamp = int(time.time() * 1000)

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    # update the todo in the database
    result = table.update_item(
        Key={
            'id': data['uid']
        },
        ExpressionAttributeNames={
          '#homelatlng': 'homelatlng',
        },
        ExpressionAttributeValues={
          ':homelatlng': data['homelatlng'],
          ':checked': data['checked'],
          ':updatedAt': timestamp,
        },
        UpdateExpression='SET #homelatlng = :homelatlng, '
                         'checked = :checked, '
                         'updatedAt = :updatedAt',
        ReturnValues='ALL_NEW',
    )
    #print("The Result Is")
    #print(result)

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": json.dumps(result['Attributes'],cls=decimalencoder.DecimalEncoder)
    }

    return response
