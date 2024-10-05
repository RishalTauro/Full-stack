import requests
from time import sleep

api_key = "your_openweather_api_key"
city = "London"
url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

def make_request(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as err:
        if response.status_code == 429:  # Rate limiting
            print("Rate limit exceeded, waiting 60 seconds...")
            sleep(60)
            return make_request(url)
        else:
            print(f"Error: {err}")
            return None

data = make_request(url)
if data:
    print(f"City: {data['name']}, Temperature: {data['main']['temp']}")
