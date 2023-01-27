from pymongo import MongoClient
from flask import Flask
import datetime
from mongoServices import *

# Connection to mongoDB from mongoServices module
client = get_database("mongodb://localhost:27017/myApp")

# This connect to the database colleciton for our the App, to access specific database we must call one further index!
listings = client['myApp']['listings']

for listing in listings.find():
    print(listing)
