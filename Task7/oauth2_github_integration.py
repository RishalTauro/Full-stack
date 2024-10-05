import requests
from requests_oauthlib import OAuth2Session
from oauthlib.oauth2 import WebApplicationClient

# Your actual Client ID and Client Secret from GitHub
client_id = 'Ov23li7Ixi6FHEXWPNs6'
client_secret = '51858834c706eea3f3d48addd1a9dc6e8e1fea25'

# Step 1: Set up OAuth2 session with client credentials
client = WebApplicationClient(client_id)

# Step 2: Define URLs
token_url = 'https://github.com/login/oauth/access_token'
redirect_uri = 'http://localhost:5000/callback'  # Adjust this if needed

# Step 3: Assume you have retrieved the authorization code from the callback
authorization_code = 'your_authorization_code'  # Replace with actual code received from callback

# Prepare to fetch the token
token_request = client.prepare_request_body(client_id=client_id, client_secret=client_secret, code=authorization_code, redirect_uri=redirect_uri)

# Send the request to GitHub to fetch the token
response = requests.post(token_url, headers={'Accept': 'application/json'}, data=token_request)


# Step 4: Parse the token response
if response.status_code == 200:
    try:
        access_token = response.json()['access_token']
        print(f"Access Token: {access_token}")
    except KeyError:
        print("Error: 'access_token' not found in the response.")
        print("Response JSON:", response.json())
else:
    print(f"Error retrieving access token: {response.status_code} - {response.text}")
