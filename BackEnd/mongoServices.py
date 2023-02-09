from pymongo import MongoClient
from pymongo import MongoClient
from flask import Flask
import datetime

# Connection string should be in form 'mongodb://localhost:27017/myApp'
def get_database(connection_string):
 
   # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
   client = MongoClient(connection_string)
 
   # Create the database for our example (we will use the same database throughout the tutorial
   return client
