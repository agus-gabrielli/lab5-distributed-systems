from fastapi import APIRouter, Body, Request, status, Header, HTTPException
from fastapi.encoders import jsonable_encoder
import requests
from datetime import datetime


from . import location_helpers

OPENWEATHERMAP_API_KEY = "28a9113026508e8266ac3dcbd50ec3ae"

openweathermap_router = APIRouter()


@openweathermap_router.get("/current")
def get_current_conditions(city: str, country: str) -> dict:
    data = location_helpers.lon_lat_for_city(city, country)
    lat = data["lat"]
    lon = data["lon"]

    url = f"https://api.openweathermap.org/data/3.0/onecall?units=metric&lat={lat}&lon={lon}&exclude=minutely&appid={OPENWEATHERMAP_API_KEY}"

    response = requests.get(url)
    if response.status_code == 200:
        weather_data = response.json()

        # Extract important information
        current_weather = {
            "temperature": weather_data["current"]["temp"],
            "feels_like": weather_data["current"]["feels_like"],
            "pressure": weather_data["current"]["pressure"],
            "uvi": weather_data["current"]["uvi"],
            "humidity": weather_data["current"]["humidity"],
            "wind_speed": weather_data["current"]["wind_speed"],
            "description": weather_data["current"]["weather"][0]["description"],
        }

        return current_weather

    return {"error": "Failed to retrieve current weather information"}


@openweathermap_router.get("/hourly")
def get_hourly_forcast(city: str, country: str, max_hours: int = 12) -> dict:
    data = location_helpers.lon_lat_for_city(city, country)
    lat = data["lat"]
    lon = data["lon"]

    url = f"https://api.openweathermap.org/data/3.0/onecall?units=metric&lat={lat}&lon={lon}&exclude=minutely&appid={OPENWEATHERMAP_API_KEY}"

    response = requests.get(url)
    if response.status_code == 200:
        weather_data = response.json()

        # Extract the next max_hours hours of hourly forecast
        hourly_forecast = []
        for hour in weather_data["hourly"][1:max_hours+1]:
            forecast_data = {
                "timestamp": datetime.utcfromtimestamp(hour["dt"]).strftime('%Y-%m-%d %H:%M'),
                "temperature": hour["temp"],
                "feels_like": hour["feels_like"],
                "humidity": hour["humidity"],
                "weather_description": hour["weather"][0]["description"],
                "pop": int(float(hour["pop"]) * 100),
            }
            hourly_forecast.append(forecast_data)

        return hourly_forecast

    return {"error": "Failed to retrieve hourly forecast"}


@openweathermap_router.get("/days")
def get_five_day_outlook(city: str, country: str, max_days: int = 5) -> dict:
    data = location_helpers.lon_lat_for_city(city, country)
    lat = data["lat"]
    lon = data["lon"]

    url = f"https://api.openweathermap.org/data/3.0/onecall?units=metric&lat={lat}&lon={lon}&exclude=minutely&appid={OPENWEATHERMAP_API_KEY}"

    response = requests.get(url)

    if response.status_code == 200:
        weather_data = response.json()

        # Extract the next max_days days of daily forecast
        day_forecast = []
        for day in weather_data["daily"][:max_days]:
            timestamp = day["dt"]
            # Convert timestamp to a human-readable date
            date = datetime.utcfromtimestamp(timestamp).date()

            forecast_data = {
                "date": date.strftime("%Y-%m-%d"),
                "max_temperature": day["temp"]["max"],
                "min_temperature": day["temp"]["min"],
                "weather_description": day["weather"][0]["description"],
                "pop": int(float(day["pop"]) * 100),
            }
            day_forecast.append(forecast_data)

        return day_forecast

    return {"error": "Failed to retrieve day forecast"}
