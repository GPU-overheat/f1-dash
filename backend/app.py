from flask import Flask, jsonify
from flask_cors import CORS
import fastf1
import os

app = Flask(__name__)
CORS(app) 
cache_dir = os.path.expanduser('~/fastf1_cache')
if not os.path.exists(cache_dir):
    os.makedirs(cache_dir)
fastf1.Cache.enable_cache(cache_dir)

@app.route('/api/session/<int:year>/<string:event>/<string:session_type>')
def get_session_data(year, event, session_type):
    try:
        session = fastf1.get_session(year, event, session_type)
        session.load(laps=True, telemetry=False, weather=False)
        results = session.results.to_json(orient='records')
        return results
    except Exception as e:
        return jsonify({"error": str(e)}), 404
