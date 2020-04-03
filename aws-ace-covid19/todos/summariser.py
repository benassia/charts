import os
import json
from todos import decimalencoder
import boto3
#import langid
import nltk
import heapq
import urllib3.request
import re
from textblob import TextBlob
from bs4 import BeautifulSoup


from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance

nltk.data.path.append("/tmp")
nltk.download("punkt", download_dir = "/tmp")
nltk.download("stopwords", download_dir = "/tmp")


def summariser(event, context):
    data = json.loads(event['body'])
    if 'text' not in data or 'ls' not in data  or 'wd' not in data:
        logging.error("Validation Failed")
        raise Exception("Couldn't create the todo item.")
    
    summary= data['text']
    linesize = data['ls']
    worddensity = data['wd']

    summary = summariseSectionDocument(summary, linesize, worddensity)
    #console.log ('the text is \n' + data['text'])
    #console.log ('the summary is \n' + summary)
    

    response = {
        "statusCode": 200,
        "headers": {
             "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Headers":"*"
        },
        "body": summary

    }
    return response


    
def summariseSectionDocument(tes, linesize=7, worddensity=30):
    article_text = None
    formatted_article_text = None
    t_summary = None 
        
    article_text = re.sub(r'\[[0-9]*\]', ' ', tes)
    article_text = re.sub(r'\s+', ' ', article_text)
    formatted_article_text = re.sub('[^a-zA-Z]', ' ', article_text )
    formatted_article_text = re.sub(r'\s+', ' ', formatted_article_text)

    sentence_list = nltk.sent_tokenize(article_text)
    stopwords = nltk.corpus.stopwords.words('english')

    word_frequencies = {}
    for word in nltk.word_tokenize(formatted_article_text):
        if word not in stopwords:
            if word not in word_frequencies.keys():
                word_frequencies[word] = 1
            else:
                word_frequencies[word] += 1
    maximum_frequncy = max(word_frequencies.values())
    for word in word_frequencies.keys():
        word_frequencies[word] = (word_frequencies[word]/maximum_frequncy)
    sentence_scores = {}
    for sent in sentence_list:
        for word in nltk.word_tokenize(sent.lower()):
            if word in word_frequencies.keys():
                if len(sent.split(' ')) < worddensity:
                    if sent not in sentence_scores.keys():
                        sentence_scores[sent] = word_frequencies[word]
                    else:
                        sentence_scores[sent] += word_frequencies[word]
        summary_sentences = heapq.nlargest(linesize, sentence_scores, key=sentence_scores.get)
    t_summary = ' '.join(summary_sentences)
    return  t_summary
