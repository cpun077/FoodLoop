from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import json
from util import get_coordinates
from donater import Donater
from receiver import Receiver
from volunteer import Volunteer
import logging


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

def donate_send_form():
    data = {"Email":"lakaayush@gmail.com", "Description":"Yummy Food", "Picture":"pic"}
    response = supabase.table('Users').select("*").eq("Email", data["Email"]).execute().data[0]
    donater = Donater(response, supabase, config)
    donater.post_food(data["Description"], data["Picture"])

def request_send_form():
    data = {"Email":"godslayer@gmail.com", "Food ID":3}
    response1 = supabase.table('Users').select("*").eq("Email", data["Email"]).execute().data[0]
    response2 = supabase.table('Food').select("*").eq("id", data["Food ID"]).execute().data[0]
    donater = Receiver(response1, supabase, config)
    donater.request_food(response2)

def volunteer_send_form():
    data = {"Email": "finnadie@gmail.com", "Delivery ID": 6}
    response1 = supabase.table('Users').select("*").eq("Email", data["Email"]).execute().data[0]
    response2 = supabase.table('Delivery').select("*").eq("id", data["Delivery ID"]).execute().data[0]
    volunteer = Volunteer(response1, supabase, config)
    volunteer.request_delivery(response2)


volunteer_send_form()
import sys
sys.exit()


@app.route("/api/form", methods=['POST'])
def send_form():
    data = request.get_json()
    address = data["Address"] + ", " + data["City"] + ", " + data["State"]
    coordinates = get_coordinates(address)
    if data and coordinates != -1:
        return jsonify({
            'message': f'{data}'
        })
    elif coordinates == -1:
        return jsonify({
            'error': 'Invalid Address'
        }), 400

    else:
        return jsonify({
            'error': 'Invalid JSON data'
        }), 400

if __name__ == "__main__":
    app.run(debug=True, port=8000)