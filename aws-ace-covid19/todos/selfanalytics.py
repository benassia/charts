import json
import os
import hashlib

from todos import decimalencoder
import boto3
from boto3.dynamodb.conditions import Key, Attr

dynamodb = boto3.resource('dynamodb')


def selfanalytics(event, context):
    chartingData = { "chartDataSet" : [{ "data": [], "label": "Temp" },{ "data": [], "label": "Status" },{ "data": [], "label": "Symptom", "yAxisID": "y-axis-1"}], "chartLabels": []};
       
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
        FilterExpression = Attr('id').contains(data['uid']+'_OBS_'),
        ConsistentRead = True
    )
    if len(result['Items']) > 0:
        dataSet = result['Items'];
        temp = []
        status = []
        symp = []
        label = []
        activ=[]
        for row in dataSet:
            temp.append(row['temp'])
            status.append(row['status'])
            symp.append(row['symptom'])
            label.append(row['datetime'])
            activ.append(row['activity'])

        chartSet = [{"data":temp, "label": "Temp" }, {"data":status, "label": "Status" }, {"data":symp, "label": "Symptom" , "yAxisID": "y-axis-1"}]
        chartLabs = label
        chartingData['chartDataSet']=chartSet
        chartingData['chartLabels']=chartLabs
        
        print(chartingData)
    else:
        print(chartingData)

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
