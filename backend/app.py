from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# MongoDB connection using MongoDB Atlas URI from the environment variables
client = MongoClient(os.getenv("MONGO_URI"))
db = client['rtsp-demo']
overlays = db['overlays']

# Helper function to convert MongoDB ObjectId to string
def serialize_overlay(overlay):
    overlay['_id'] = str(overlay['_id'])
    return overlay

# Route to create a new overlay
@app.route('/overlay', methods=['POST'])
def create_overlay():
    data = request.json
    # Insert data into the overlays collection
    inserted_id = overlays.insert_one(data).inserted_id
    return jsonify({"message": "Overlay created successfully", "id": str(inserted_id)}), 201

# Route to get all overlays
@app.route('/overlay', methods=['GET'])
def get_overlays():
    overlay_list = list(overlays.find())
    # Serialize the ObjectIds into strings for JSON compatibility
    overlay_list = [serialize_overlay(overlay) for overlay in overlay_list]
    return jsonify(overlay_list), 200

# Route to update an existing overlay by ID
@app.route('/overlay/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    data = request.json
    # Convert overlay_id from string to ObjectId
    result = overlays.update_one({"_id": ObjectId(overlay_id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"message": "Overlay not found"}), 404
    return jsonify({"message": "Overlay updated successfully"}), 200

# Route to delete an overlay by ID
@app.route('/overlay/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    # Convert overlay_id from string to ObjectId
    result = overlays.delete_one({"_id": ObjectId(overlay_id)})
    if result.deleted_count == 0:
        return jsonify({"message": "Overlay not found"}), 404
    return jsonify({"message": "Overlay deleted successfully"}), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
