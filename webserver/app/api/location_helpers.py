import requests

OPENWEATHERMAP_API_KEY = "28a9113026508e8266ac3dcbd50ec3ae"

def lon_lat_for_city(city_name, country):
    url = f"http://api.openweathermap.org/geo/1.0/direct?q={city_name},{country}&limit=1&appid={OPENWEATHERMAP_API_KEY}"  # Replace with the URL you want to make a GET request to
    response = requests.get(url)
    if response.status_code == 200:
        print(response.json()[0])
        return {"lat": response.json()[0]["lat"], "lon": response.json()[0]["lon"]} 
    else:
        return {"error": "Failed to fetch data from the external URL"}