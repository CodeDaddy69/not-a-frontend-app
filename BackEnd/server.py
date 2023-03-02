from pymongo import MongoClient
from flask import Flask, request, jsonify, make_response
from markupsafe import escape
from mongoServices import *
from flask_cors import CORS, cross_origin
from ecdsa import SigningKey
from Signing import veryify_me
from essential_generators import DocumentGenerator
from cors_resp import _build_cors_preflight_response, _corsify_actual_response
from datetime import timedelta
import jwt
from datetime import datetime, timedelta
from functools import wraps

# private_key = SigningKey.generate() # uses NIST192p
# signature = private_key.sign(b"Educative authorizes this shot")
# print(signature)
# public_key = private_key.verifying_key
# print("Verified:", public_key.verify(signature, b"Educative authorizes this shot"))

# Connection to mongoDB from mongoServices module
client = get_database("mongodb://localhost:27017")

# This connect to the database colleciton for our the App, to access specific database we must call one further index!
database = client['myApp']

# Initializing flask app
app = Flask(__name__)
cors = CORS(app, resources={r"/setCookie": {"origins": "*"},r"/getAuthMsg": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'  
app.config['SECRET_KEY'] = 'secret_key'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'])
            user = data['public_id']
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users context to the routes
        return  f(user, *args, **kwargs)
  
    return decorated

# Here we initiate cookie and send response back to front end to store!
# This function should check the authentication against the users public key on phnatom wallet then create session and send back session 
# key if authentic
@app.route('/setCookie', methods=['POST','OPTIONS'])
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def setCookie():

    signature = request.json['Signature']
    pubKey = request.json['PubKey']
    message = request.json['message']
    
    res = veryify_me(pubKey, message, signature)

    if res == True:

        print("HELLO")

        token = jwt.encode({
            'public_id': pubKey,
            'time' : datetime.utcnow(),
            'message' : message 
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'])

        print(token)

        return jsonify({'token' : token})

    else: 

        response = jsonify({"verified" : res})

        return response

@app.route('/getAuthMsg/<pubKey>', methods=['GET','OPTIONS'])
def getMsg(pubKey):

    if request.method == 'OPTIONS':

        return _build_cors_preflight_response()
    
    if request.method == 'GET':
        # Creates random sentence to be signed
        gen = DocumentGenerator()
        sentence = gen.sentence()

        response = jsonify({"authMsg" : sentence})

        return _corsify_actual_response(response)



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
                "condition" : str(listing["condition"]),
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
    app.run(debug=False)

  