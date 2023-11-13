import requests

OPENWEATHERMAP_API_KEY = "28a9113026508e8266ac3dcbd50ec3ae"  # API key for OpenWeatherMap

# Function to retrieve longitude and latitude for a given city and country
def lon_lat_for_city(city_name, country):
    # Constructing the URL with the city, country, and API key to query OpenWeatherMap API
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={city_name},{country}&limit=1&appid={OPENWEATHERMAP_API_KEY}"
    
    # Making a GET request to the constructed URL
    response = requests.get(url)
    
    # Checking if the request was successful (status code 200)
    if response.status_code == 200:
        # Printing the retrieved data for the first result (for reference or debugging)
        print(response.json()[0])
        
        # Returning a dictionary with latitude and longitude extracted from the API response
        return {"lat": response.json()[0]["lat"], "lon": response.json()[0]["lon"]} 
    else:
        # If the request was not successful, return an error message
        return {"error": "Failed to fetch data from the external URL"}
