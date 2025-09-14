from flask import Flask, jsonify
from flask_cors import CORS
import fastf1
import os
import json

app = Flask(__name__)
CORS(app) 
cache_dir = os.path.expanduser('~/fastf1_cache')
if not os.path.exists(cache_dir):
    os.makedirs(cache_dir)
fastf1.Cache.enable_cache(cache_dir)

@app.route('/api/session/<int:year>/<event>/<string:session_type>')
def get_session_data(year, event, session_type):
    try:
        fastf1.Cache.clear_cache()
        event_identifier = None
        if event.isdigit():
            event_identifier = int(event)
        else:
            event_identifier = event
        
        session = fastf1.get_session(year, event_identifier, session_type)
        session.load(laps=True, telemetry=False, weather=False)
        
        event_name = session.event['EventName']
        event_date = session.event['EventDate'].strftime('%d/%m/%Y')


        results_df = session.results.copy()

        results_df['Time'] = results_df['Time'].astype(str)
        results_df.loc[results_df['Time'] == 'NaT', 'Time'] = None

        required_columns = [
            'DriverNumber', 
            'Position', 
            'FullName', 
            'TeamName', 
            'TeamColor', 
            'Time', 
            'Status'
        ]
        results_df = results_df[required_columns]
        results_list = json.loads(results_df.to_json(orient='records'))

        response_data = {
            "eventName": event_name,
            "eventDate": event_date,
            "results": results_list
        }
        
        return jsonify(response_data)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 404