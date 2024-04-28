from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from supabase import create_client, Client
import json
from util import get_coordinates
from donater import Donater
from receiver import Receiver
from volunteer import Volunteer
import logging
import base64


logging.getLogger("httpx").setLevel(logging.WARNING)


with open("config.json", "r") as jsonFile:
    config = json.load(jsonFile)

supabase = create_client(config["url"], config["key"])

app = Flask(__name__)
CORS(app)


@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message':'Flask Connected!'
    })

@app.route("/api/give", methods=['POST'])
def give():
    data = request.get_json()
    response = supabase.table('Users').select("*").eq("Email", data["Email"]).execute().data[0]
    donater = Donater(response, supabase, config)
    donater.post_food(data["Description"], data["Picture"])
    print(response)
    return jsonify({
        'message': f'{data}'
    })

@app.route("/api/request", methods=['POST'])
def receive():
    #data = request.get_json()
    data = {"Email":"godslayer@gmail.com", "Food ID":3}
    response1 = supabase.table('Users').select("*").eq("Email", data["Email"]).execute().data[0]
    response2 = supabase.table('Food').select("*").eq("id", data["Food ID"]).execute().data[0]
    donater = Receiver(response1, supabase, config)
    donater.request_food(response2)
    print(response1, response2)
    return jsonify({
        'message': f'{data}'
    })

@app.route("/api/volunteer", methods=['POST'])
def volunteer():
    #data = request.get_json()
    data = {"Email": "finnadie@gmail.com", "Delivery ID": 6}
    response1 = supabase.table('Users').select("*").eq("Email", data["Email"]).execute().data[0]
    response2 = supabase.table('Delivery').select("*").eq("id", data["Delivery ID"]).execute().data[0]
    volunteer = Volunteer(response1, supabase, config)
    volunteer.request_delivery(response2)
    print(response1, response2)
    data, count = supabase.table('Food').delete().eq('id', data["Food ID"]).execute()

    return jsonify({
        'message':data
    })

#@app.route("/api/cleanup", methods=['POST'])
def cleanup():
    # call this when requester has received food
    # data = request.get_json()
    data = {"Delivery ID":6}
    data, count = supabase.table('Delivery').delete().eq('id', data["Delivery ID"]).execute()


@app.route("/api/signup", methods=['POST'])
def signup():
    print(request)
    data = request.get_json()
    address = data["Address"] + ", " + data["City"] + ", " + data["State"]
    coordinates = get_coordinates(address)
    if data and coordinates != -1:
        response = supabase.table('Users').select('*').eq("Email", data["Email"]).execute()

        if len(response.data) > 0:
            return jsonify({
                "error": "User already exists"
            }), 400
        else:
            data["Longitude"] = 1.00
            data["Latitude"] = 1.00
            response = supabase.table('Users').insert({ 
                "Name" : data["Name"],
                "Email" : data["Email"],
                "PhoneNumber" : data["PhoneNumber"],
                "Address" : data["Address"],
                "City" : data["City"],
                "State" : data["State"],
                "Zip Code" : data["Zip Code"],
                "Organization" : data["Organization"],
                "Type" : data["Type"],
                "Password" : data["Password"],
                "Longitude" : 1.00,
                "Latitude" : 1.00,
            }).execute()
            print(response)
            return jsonify({
                'message': f'{data}'
            })
        
    elif coordinates == -1:
        return jsonify({
            "error": "Invalid home address"
        }), 400

    else:
        return jsonify({
            "error": "Missing some fields"
        }), 400
    
@app.route("/api/foods", methods=['GET']) 
def get_food():
    response = supabase.table('Food').select("*").execute().data

    return jsonify({
        "message":f"{response}"
        })

@app.route("/api/deliveries", methods=['GET']) 
def get_deliveries():
    response = supabase.table('Delivery').select("*").execute().data
    rets = []
    print(response)

    for r in response:
        if r["in_progress"] == True:
            continue
        # extra location logic later
        val = {}
        val["Delivery ID"] = r["id"]
        val["Date"] = r["Date"]
        val["Poster"] = r["Poster"]
        val["Description"] = r["Description"]
        val["Pickup Address"] = r["DAddress"] + ", " + r["DCity"] + ", " + r["DState"]
        val["Delivery Address"] = r["RAddress"] + ", " + r["RCity"] + ", " + r["RState"]
        rets.append(val)

    return jsonify({
        "message":f"{rets}"
        })

@app.route("/api/signin", methods=['POST'])
def signin():
    data = request.get_json()
    if data:
        response1 = supabase.table('Users').select('*').eq("Email", data["Email"]).execute()
        response2 = supabase.table('Users').select('*').eq("Password", data["Password"]).execute()
        print(response1, response2)

        if len(response1.data) > 0 and len(response2.data) > 0:
            return jsonify({
                'message': f'{data}'
            })
        else:
            return jsonify({
                "error": "Incorrect credentials"
            }), 404

    else:
        return jsonify({
            "error": "Missing some fields"
        }), 400

if __name__ == "__main__":
    app.run(debug=True, port=8000)