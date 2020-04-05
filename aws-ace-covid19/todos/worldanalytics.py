import json
import os
import hashlib

from todos import decimalencoder
import boto3
dynamodb = boto3.resource('dynamodb')


WorldDataSet = "{chartType: 'radar',chartLabels: [ 'TotalCases', 'New Cases', 'Recovered', 'Active', 'Serious', 'Total Staff'],chartData: [{data: [90, 150, 200, 45, 160, 45], label: 'Aegon NL'},{data: [90, 150, 200, 45, 160, 45], label: 'AMM NL'},{data: [90, 150, 200, 45, 160, 45], label: 'NL'},{data: [120, 130, 180, 70, 140, 45], label: 'Aegon UK'},{data: [90, 150, 200, 45, 160, 45], label: 'AMM UK'},{data: [120, 130, 180, 70, 140, 45], label: 'UK'},{data: [90, 150, 200, 45, 160, 45], label: 'Transamerica'},{data: [90, 150, 200, 45, 160, 45], label: 'AMM US'},{data: [90, 150, 200, 45, 160, 45], label: 'USA'},{data: [90, 150, 200, 45, 160, 45], label: 'Aegon Life'},{data: [90, 150, 200, 45, 160, 45], label: 'India'},{data: [90, 150, 200, 45, 160, 45], label: 'Aegon TK'},{data: [90, 150, 200, 45, 160, 45], label: 'Turkey'},{data: [90, 150, 200, 45, 160, 45], label: 'Aegon RO'},{data: [90, 150, 200, 45, 160, 45], label: 'Romania'},{data: [90, 150, 200, 45, 160, 45], label: 'Aegon PL'},{data: [90, 150, 200, 45, 160, 45], label: 'Poland'},{data: [10, 200, 60, 110, 180, 45], label: 'Aegon SP'},{data: [10, 200, 60, 110, 180, 45], label: 'Spain'}]}"



def worldanalytics(event, context):
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
        "body": json.dumps(WorldDataSet, cls=decimalencoder.DecimalEncoder)
    }

    return response
