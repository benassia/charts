import json
import logging
import os
import time
import uuid
import hashlib

import boto3
dynamodb = boto3.resource('dynamodb')






def observation(event, context):

    mapSymptom = {
                "None":"0",
                "Dry Cough":"2",
                "Taste Loss":"4",
                "Sore Throat":"6",
                "Smell Loss":"8",
                "Fever":"10"
    }
    mapStatus = {  
                "Very Good":"0",
                "Good":"2",
                "Fine":"4",
                "Not So Good":"6",
                "Ill":"8"
    }
    mapActivity = {            
                "At Work":"0",
                "At Home":"2",
                "In Quarantine":"4",
                "In Bed":"6",
                "Seen Doctor":"8",
                "Hospitalised":"10"                
    }

            
    etype="OBSERVATION"
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
    





    timestamp = str(time.time())

    table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

    item = {
        'id': data['id'],
        'etype': etype,
        'crc': data['crc'],
        'uid': data['uid'],        
        'record': data['record'],
        'status': data['status'],
        'sval': mapStatus[data['status']],
        'activity': data['activity'],
        'aval': mapActivity[data['activity']],
        'temp': data['temp'],
        'tval': data['temp'],
        'org': data['org'],
        'symptom': data['symptom'],
        'syval': mapSymptom[data['symptom']],
        'latlng': data['latlng'],
        'notes': data['notes'],
        'bstate': data['bstate'],
        'datetime':data['datetime'],
        'checked': data['checked'],
        'createdAt': timestamp,
        'updatedAt': timestamp,
    }
    print (item)
    # write the todo to the database
    table.put_item(Item=item)

    # create a response
    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": json.dumps(item)
    }

    return response
