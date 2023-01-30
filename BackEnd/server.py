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

    current_listings = []

    if request.method == 'GET':
        for listing in appCollection['listings'].find():
            print("hello")
            new_data =  {
                "name" : listing["name"],
                "price" : "£" + str(listing["price"]),
                "itemType" : listing["itemType"],
                "color" : listing["colour"],
                "condition" : "£" + str(listing["condition"]),
                "status" : listing["saleState"]
                }
            current_listings.append(new_data)
        return current_listings

# Gets all listings TODO - allow arguments for more advanced searches ie jackets, shoes...
@app.route('/listings/{address}', methods=['GET'])
def view_listings_address(address):
    if request.method=='GET':
        current_listings = []
        print(address)
        # Get all listings and add to list
        if (len(address)!=0):
            for listing in appCollection['listings'].find("seller" == address):
                new_data =  {
                    "name" : listing["name"],
                    "price" : "£" + str(listing["price"]),
                    "itemType" : listing["itemType"],
                    "color" : listing["colour"],
                    "condition" : "£" + str(listing["condition"]),
                    "status" : listing["saleState"]
                    }
                current_listings.append(new_data)
            else:
                for listing in appCollection['listings'].find():
                    print("hello")
                    new_data =  {
                        "name" : listing["name"],
                        "price" : "£" + str(listing["price"]),
                        "itemType" : listing["itemType"],
                        "color" : listing["colour"],
                        "condition" : "£" + str(listing["condition"]),
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

  