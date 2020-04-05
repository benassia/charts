import os
import json
import hashlib

from todos import decimalencoder
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')


def forgot(event, context):

    data = json.loads(event['body'])
    if 'mobile' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")

    data['email'] = 'ERROR@ERROR.ERROR';
    data['sword'] = 'ERROR@ERROR';        

    md = hashlib.md5();
    vCrc = data['crc']
    vTst = str(data['mobile']+'yabba').encode('utf-8');
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
        FilterExpression = Attr('mobile').eq(data['mobile']),
        ConsistentRead = True
    )

   
    
    data['email'] = result['Items'][0]['email'];
    data['sword'] = result['Items'][0]['sword'];
 
    # create a response
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": json.dumps(data)

    }

    return response
