import json
import os

from todos import decimalencoder
import boto3
dynamodb = boto3.resource('dynamodb')


def observationlist(event, context):
    data = json.loads(event['body'])
    if 'crc' not in data or 'uid' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.") 
           
    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    # fetch all todos from the database
    result = table.scan()

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": json.dumps(result['Items'],cls=decimalencoder.DecimalEncoder)
    }

    return response
