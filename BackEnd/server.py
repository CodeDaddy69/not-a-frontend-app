from pymongo import MongoClient
from flask import Flask, request, jsonify, session
import datetime
from mongoServices import *
from flask_cors import CORS, cross_origin
from ecdsa import SigningKey
from Signing import veryify_me

# private_key = SigningKey.generate() # uses NIST192p
# signature = private_key.sign(b"Educative authorizes this shot")
# print(signature)
# public_key = private_key.verifying_key
# print("Verified:", public_key.verify(signature, b"Educative authorizes this shot"))

# Connection to mongoDB from mongoServices module
client = get_database("mongodb://localhost:27017/myApp")

# This connect to the database colleciton for our the App, to access specific database we must call one further index!
appCollection = client['myApp']
  
# Initializing flask app
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'  

# To be changed of course, this allows flask to encrypt all session data!
app.secret_key = 'LyndonBumCheese'

# Here we initiate cookie and send response back to front end to store!
# This function should check the authentication against the users public key on phnatom wallet then create session and send back session 
# key if authentic
@app.route('/setCookie', methods=['POST'])
def setCookie():

    if request.method == 'POST':
        signature = request.json['Signature']
        pubKey = request.json['PubKey']
        message = request.json['message']

        # print(pubKey)
        # print(signature)
        # print(message)
        res = veryify_me(pubKey, message, signature)

        print(res)

        response = jsonify({"verified" : res})
        response.headers.add('Access-Control-Allow-Origin', '*')

        return response


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

  