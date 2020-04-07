import json
import os
import hashlib

from todos import decimalencoder
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')



def worldanalytics(event, context):
    WorldSet = {"WorldDataSet": {
                                "chartType": "radar",
                                "chartLabels": [ "TotalCases", "New Cases", "Recovered", "Active", "Serious", "Total Staff"],
                                "chartData": [
                                  {"data": [90, 150, 200, 45, 160, 45], "label": "Aegon Group"},
                                  {"data": [90, 150, 200, 45, 160, 45], "label": "UK"},
                                  {"data": [90, 150, 200, 45, 160, 45], "label": "USA"},
                                  {"data": [120, 130, 180, 70, 140, 45],"label": "EUROPE"},
                                  {"data": [90, 150, 200, 45, 160, 45], "label": "ASIA"},
                                  {"data": [120, 130, 180, 70, 140, 45],"label": "AFRICA"},
                                  {"data": [90, 150, 200, 45, 160, 45], "label": "AUSTASIA"},
                                  {"data": [90, 150, 200, 45, 160, 45], "label": "SAMERICA"},
                                  {"data": [90, 150, 200, 45, 160, 45], "label": "NAMERICA"}
                                  ]
                              }
                              };
       
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

    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": json.dumps(WorldSet)
    }

    return response
