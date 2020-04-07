import json
import os
import hashlib

from todos import decimalencoder
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')


def tracklist(event, context):
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


    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    result = table.scan(
        FilterExpression = Attr('id').contains(data['uid']+'_TRK_'),
        ConsistentRead = True
    )

    print(result)
    
    # create a response
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
            },
        "body": json.dumps(result, cls=decimalencoder.DecimalEncoder)
    }

    return response
