import json
import os
import hashlib

from todos import decimalencoder
import boto3
dynamodb = boto3.resource('dynamodb')

rdata = "{chartData: [ { data: [37, 37, 37, 37, 37, 37, 37], label: 'Temp' },{ data: [5, 5, 4, 4, 4, 3, 2], label: 'Status' },{ data: [1, 1, 1, 4, 4, 5, 5], label: 'Symptom', yAxisID: 'y-axis-1'}],chartLabels: ['1-Jan', '2-Jan', '3-Jan', '4-Jan', '5-Jan', '6-Jan', '7-Jan']}"


def selfanalytics(event, context):
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

    # fetch all todos from the database
    result = table.scan()

    # create a response
     #"body": json.dumps(result['Items'], cls=decimalencoder.DecimalEncoder)
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": json.dumps(rdata, cls=decimalencoder.DecimalEncoder)
    }

    return response
