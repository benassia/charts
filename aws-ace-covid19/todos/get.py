import os
import json

from todos import decimalencoder
import boto3
dynamodb = boto3.resource('dynamodb')


def get(event, context):

    data = json.loads(event['body'])
    if 'email' not in data or 'sword' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    # fetch todo from the database
    result = table.get_item(
        Key={
            'id': data['email']
        }
    )

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": json.dumps(result['Item'],cls=decimalencoder.DecimalEncoder)

    }

    return response
