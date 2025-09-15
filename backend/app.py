from flask import Flask, jsonify
from flask_cors import CORS
import fastf1
import os
import json
from datetime import datetime

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
        event_identifier = int(event) if event.isdigit() else event
        
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
    
@app.route('/api/latest_race/<int:year>')
def get_latest_race(year):
    """
    Finds the most recently completed race and returns its top 5 results.
    """
    try:
        fastf1.Cache.clear_cache()
        schedule = fastf1.get_event_schedule(year)
        today = datetime.now().date()
        past_events = schedule[schedule['EventDate'].dt.date < today]
        
        if past_events.empty:
            return jsonify({"error": "No completed races found for this year."}), 404
        latest_event = past_events.iloc[-1]
        
        session = fastf1.get_session(year, latest_event['RoundNumber'], 'R')
        session.load()
        
        results_df = session.results.copy().head(5)
        
        required_columns = ['Position', 'FullName', 'TeamName']
        results_df = results_df[required_columns]
        
        response_data = {
            "eventName": session.event['EventName'],
            "results": json.loads(results_df.to_json(orient='records'))
        }
        return jsonify(response_data)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/next_race/<int:year>')
def get_next_race(year):
    """
    Finds the next upcoming race and returns its details.
    """
    try:
        fastf1.Cache.clear_cache()
        schedule = fastf1.get_event_schedule(year)
        
        today = datetime.now().date()
        future_events = schedule[schedule['EventDate'].dt.date >= today]
        
        if future_events.empty:
            return jsonify({"error": "No future races found for this year."}), 404
            
        next_event = future_events.iloc[0]
        
        response_data = {
            "eventName": next_event['EventName'],
            "country": next_event['Country'],
            "eventDate": next_event['EventDate'].strftime('%d/%m/%Y'),
            "round": next_event['RoundNumber']
        }
        return jsonify(response_data)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500