from fastapi import APIRouter, Body, Request, status, Header, HTTPException
from fastapi.encoders import jsonable_encoder
import requests
from datetime import datetime

from . import location_helpers

WEATHERCOM_API_KEY = "3511c9fc121047a891c231621230711" # API key for Weather.com

weathercom_router = APIRouter() # Creating an instance of APIRouter for Weather.com API endpoints

@weathercom_router.get("/current")
def get_current_conditions(city: str, country: str) -> dict:
    # For Weather.com we can pass directly the City and Country, no need to look for its coordinates!
    url = f"http://api.weatherapi.com/v1/current.json?key={WEATHERCOM_API_KEY}&q={city}, {country}&aqi=no"

    response = requests.get(url)
    if response.status_code == 200:
        weather_data = response.json()

        # Extract important information
        current_weather = {
            "temperature": weather_data["current"]["temp_c"],
            "feels_like": weather_data["current"]["feelslike_c"],
            "pressure": weather_data["current"]["pressure_mb"],
            "uvi": weather_data["current"]["uv"],
            "humidity": weather_data["current"]["humidity"],
            "wind_speed": weather_data["current"]["wind_kph"],
            "description": weather_data["current"]["condition"]["text"],
        }

        return current_weather

    return {"error": "Failed to retrieve current weather information"}


@weathercom_router.get("/hourly")
def get_hourly_forcast(city: str, country: str, max_hours: int = 12) -> dict:
    url = f"http://api.weatherapi.com/v1/forecast.json?key={WEATHERCOM_API_KEY}&q={city}, {country}&days=2&aqi=no&alerts=no"

    response = requests.get(url)
    if response.status_code == 200:
        weather_data = response.json()

        # Extract the next max_hours hours of hourly forecast
        hourly_forecast = []
        for day in weather_data["forecast"]["forecastday"]:
            for hour in day["hour"]:
                print(hour["time"])
                date_obj = datetime.strptime(hour["time"], "%Y-%m-%d %H:%M")
                current_datetime = datetime.now()
                if date_obj < current_datetime:
                    print("aca")
                    continue # If this is an old hour, skip it

                forecast_data = {
                    "timestamp": hour["time"],
                    "temperature": hour["temp_c"],
                    "feels_like": hour["feelslike_c"],
                    "humidity": hour["humidity"],
                    "weather_description": hour["condition"]["text"],
                    "pop": hour["chance_of_rain"],
                }
                hourly_forecast.append(forecast_data)

        return hourly_forecast[:max_hours]

    return {"error": "Failed to retrieve hourly forecast"}


@weathercom_router.get("/days")
def get_five_day_outlook(city: str, country: str, max_days: int = 5) -> dict:
    url = f"http://api.weatherapi.com/v1/forecast.json?key={WEATHERCOM_API_KEY}&q={city}, {country}&days={max_days}&aqi=no&alerts=no"

    response = requests.get(url)

    if response.status_code == 200:
        weather_data = response.json()

        # Extract the next max_days days of daily forecast
        day_forecast = []
        for day in weather_data["forecast"]["forecastday"]:
            forecast_data = {
                "date": day["date"],
                "max_temperature": day["day"]["maxtemp_c"],
                "min_temperature": day["day"]["mintemp_c"],
                "weather_description": day["day"]["condition"]["text"],
                "pop": day["day"]["daily_chance_of_rain"],
            }
            day_forecast.append(forecast_data)

        return day_forecast

    return {"error": "Failed to retrieve day forecast"}
