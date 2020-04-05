import json
import logging
import os
import time
import uuid
import hashlib
import boto3
from botocore.exceptions import ClientError

# Replace sender@example.com with your "From" address.
# This address must be verified with Amazon SES.
SENDER = "C19 TRACKER BOT <mailbot@c19.ace-aegon.cloud>"

# Replace recipient@example.com with a "To" address. If your account 
# is still in the sandbox, this address must be verified.
RECIPIENT = "allan@swift69.co.uk"

# Specify a configuration set. If you do not want to use a configuration
# set, comment the following variable, and the 
# ConfigurationSetName=CONFIGURATION_SET argument below.
# CONFIGURATION_SET = "ConfigSet"

# If necessary, replace us-west-2 with the AWS Region you're using for Amazon SES.
AWS_REGION = os.environ['AWS_REGION']

# The subject line for the email.
SUBJECT = "Amazon SES Test (SDK for Python)"

# The email body for recipients with non-HTML email clients.
BODY_TEXT = ("Amazon SES Test (Python)\r\n"
             "This email was sent with Amazon SES using the "
             "AWS SDK for Python (Boto)."
            )
            
# The HTML body of the email.
BODY_HTML = """<html>
<head></head>
<body>
  <h1>Amazon SES Test (SDK for Python)</h1>
  <p>This email was sent with
    <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
    <a href='https://aws.amazon.com/sdk-for-python/'>
      AWS SDK for Python (Boto)</a>.</p>
</body>
</html>
            """            

# The character encoding for the email.
CHARSET = "UTF-8"

# Create a new SES resource and specify a region.
client = boto3.client('ses',region_name=AWS_REGION)

comms = { 'error': 'false', 'message': '' }

def email(event, context):

    data = json.loads(event['body'])
    if 'crc' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")

    data = json.loads(event['body'])


    md = hashlib.md5();
    vCrc = data['crc']
    vTst = str(data['email']+'yabba').encode('utf-8');
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




    RECIPIENT = data['email']
    SUBJECT= data['subject']
    BODY_TEXT = (data['text_message'])
    BODY_HTML = """<html>
                <head></head>
                <body>
                <h1>"""+SUBJECT+"""</h1>
                <p>"""+data['html_message'] +"""</p>
                </body>
                </html>
                """ 
    # Try to send the email.
    try:
        #Provide the contents of the email.
        emailResp = client.send_email(
            Destination={
                'ToAddresses': [
                    RECIPIENT,
                ],
            },
            Message={
                'Body': {
                    'Html': {
                        'Charset': CHARSET,
                        'Data': BODY_HTML,
                    },
                    'Text': {
                        'Charset': CHARSET,
                        'Data': BODY_TEXT,
                    },
                },
                'Subject': {
                    'Charset': CHARSET,
                    'Data': SUBJECT,
                },
            },
            Source=SENDER,
            # If you are not using a configuration set, comment or delete the
            # following line
            #ConfigurationSetName=CONFIGURATION_SET,
        )
    # Display an error if something goes wrong.	
    except ClientError as e:
        #print(e.response['Error']['Message'])
        comms['error'] = 'true'
        comms['message'] = e.response['Error']['Message']
        # create a response
    else:
        #print("Email sent! Message ID:")
        #print(emailResp['MessageId'])
        # create a response
        comms['message'] = emailResp['MessageId']
    

    response = {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin":"*",
                "Access-Control-Allow-Methods":"*",
                "Access-Control-Allow-Headers":"*"
            },
            "body": json.dumps(comms)
    }
    
    return response