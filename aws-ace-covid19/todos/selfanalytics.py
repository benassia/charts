import json
import os
import hashlib

from todos import decimalencoder
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')


def selfanalytics(event, context):
    chartingData = { "chartDataSet" : [{ "data": [37.2, 36.1, 36.1, 37.2, 37.2, 38, 38], "label": "Temp" },{ "data": [0, 10, 20, 30, 30, 20, 10], "label": "Status" },{ "data": [0, 10, 0, 30, 30, 30, 30], "label": "Symptom", "yAxisID": "y-axis-1"}], "chartLabels": ["1-Jan", "2-Jan", "3-Jan", "4-Jan", "5-Jan", "6-Jan", "7-Jan"]};

       
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
        FilterExpression = Attr('id').eq(data['uid']+'_OBS_'),
        ConsistentRead = True
    )

    # create a response
     #"body": json.dumps(result['Items'], cls=decimalencoder.DecimalEncoder)
    
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": json.dumps(chartingData)
    }

    return response
