import requests

api_key = "your_openweather_api_key"
city = "London"

response = requests.get(f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}")

if response.status_code == 200:
    data = response.json()
    print(f"City: {data['name']}, Temperature: {data['main']['temp']}")
else:
    print(f"Error fetching weather data: {response.status_code}")
