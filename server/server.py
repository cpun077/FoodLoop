from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/home", methods=['GET'])
def return_home():
    return jsonify({
        'message':'Flask Connected!'
    })

@app.route("/api/form", methods=['POST'])
def send_form():
    data = request.get_json()
    if data:
        return jsonify({
            'message': f'{data}'
        })
    else:
        return jsonify({
            'error': 'Invalid JSON data'
        }), 400

if __name__ == "__main__":
    app.run(debug=True, port=8000)