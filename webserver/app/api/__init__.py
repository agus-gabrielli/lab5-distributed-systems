from fastapi import APIRouter

from .openweathermap import openweathermap_router
from .weathercom import weathercom_router


api_router = APIRouter()


api_router.include_router(openweathermap_router, tags=["OpenWeatherMap"], prefix="/openweathermap")
api_router.include_router(weathercom_router, tags=["Weather.com"], prefix="/weathercom")