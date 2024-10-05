from flask import Flask, request, jsonify
from flask_caching import Cache
from celery import Celery
import logging

# Initialize Flask app
app = Flask(__name__)

# Configure caching
cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})

# Configure Celery
app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'  # Make sure Redis is running
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'
celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
celery.conf.update(app.config)

# Configure logging
logging.basicConfig(level=logging.INFO)

# Middleware to log requests
@app.before_request
def log_request():
    logging.info(f"Request: {request.method} {request.path}")

# Example of a background task
@celery.task
def background_task(data):
    logging.info(f"Processing data in background: {data}")
    # Simulating a long-running process
    import time
    time.sleep(5)
    return f"Processed: {data}"

# Route to handle requests
@app.route('/process', methods=['POST'])
def process_data():
    data = request.json.get('data', '')
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Call the background task
    task = background_task.apply_async(args=[data])
    return jsonify({'task_id': task.id, 'status': 'Processing started'}), 202

# Route to check task status
@app.route('/status/<task_id>', methods=['GET'])
def task_status(task_id):
    task = background_task.AsyncResult(task_id)
    if task.state == 'PENDING':
        response = {
            'state': task.state,
            'status': 'Pending...'
        }
    elif task.state != 'FAILURE':
        response = {
            'state': task.state,
            'result': task.result
        }
    else:
        response = {
            'state': task.state,
            'error': str(task.info)  # this will be the exception raised
        }
    return jsonify(response)

# Caching example
@app.route('/cached/<int:num>', methods=['GET'])
@cache.cached(timeout=30)  # Cache this view for 30 seconds
def cached_route(num):
    return jsonify({'result': num * num})

if __name__ == '__main__':
    app.run(debug=True)
