from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import api_router

app = FastAPI(title="Lab6-Webserver")

origins = ["*"]  # Defining allowed origins for CORS (Cross-Origin Resource Sharing)

# Adding CORS (Cross-Origin Resource Sharing) middleware to the FastAPI app
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allowing requests from specified origins
    allow_credentials=True,  # Allowing credentials (cookies, authentication) in requests
    allow_methods=["*"],  # Allowing all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allowing all headers in the requests
)

@app.get("/", tags=["Health"])  # Defining a route for the root URL ("/") with a tag "Health"
def get_root() -> dict:  # Defining a function to handle the root URL request
    return {"message": "OK"}  # Returning a dictionary with a message indicating health status

app.include_router(api_router)  # Including additional API routes from api_router (the ones of the weather)