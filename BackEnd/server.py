from pymongo import MongoClient
from flask import Flask, request, jsonify
import datetime
from mongoServices import *
from flask_cors import CORS, cross_origin

# Connection to mongoDB from mongoServices module
client = get_database("mongodb://localhost:27017/myApp")

# This connect to the database colleciton for our the App, to access specific database we must call one further index!
appCollection = client['myApp']
  
# Initializing flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'  

  
# Gets all listings TODO - allow arguments for more advanced searches ie jackets, shoes...
@app.route('/listings', methods=['GET'])
def view_listings():
  
    if request.method=='GET':
        current_listings = []
        # Get all listings and add to list
        for listing in appCollection['listings'].find():
            new_data =  {
                "name" : listing["name"],
                "price" : "£" + str(listing["price"]),
                "itemType" : listing["itemType"]
                }
            current_listings.append(new_data)
        return current_listings
  
# Add functionality for POST requests for a new listing...
@app.route('/newlisting', methods=['POST'])
def new_listing():
    if request.method=='POST':
        response = jsonify({'some': 'data'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        
        # TODO - Add any new listing to the mongoDB!

        return response
    
# Running app
if __name__ == '__main__':
    app.run(debug=True)

  