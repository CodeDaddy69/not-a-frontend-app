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


@app.route('/listings', methods=['GET','POST'])
def view_listings():

    current_listings = []

    if request.method == 'POST':

        # TODO - Text technologies functionality to find relevant results from search 
        query = request.json['query']

        for listing in appCollection['listings'].find():
            new_data =  {
                "name" : listing["name"],
                "price" : str(listing["price"]),
                "itemType" : listing["itemType"],
                "color" : listing["colour"],
                "condition" : "£" + str(listing["condition"]),
                "status" : listing["saleState"]
                }
            current_listings.append(new_data)

    # TO ADAM: feel free to remove - im only adding this here so the browse page works
    if request.method == 'GET':
        for listing in appCollection['listings'].find():
            new_data =  {
                "listing" : listing["listing"],
                "name" : listing["name"],
                "price" : str(listing["price"]),
                "itemType" : listing["itemType"],
                "color" : listing["colour"],
                "condition" : str(listing["condition"]),
                "status" : listing["saleState"]
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
        if (request.data):
            appCollection['listings'].insert_one(request.json)
            return response
        else:
            return response
    
# Running app
if __name__ == '__main__':
    app.run(debug=True)

  