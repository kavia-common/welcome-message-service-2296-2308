from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

openapi_tags = [
    {"name": "Health", "description": "Service health and readiness endpoints."},
    {"name": "Welcome", "description": "Endpoints that provide welcome messaging."},
]

app = FastAPI(
    title="Welcome Message Service",
    description=(
        "A small FastAPI service that provides a welcome message.\n\n"
        "Useful for demos, smoke tests, and scaffolding API deployments."
    ),
    version="1.0.0",
    openapi_tags=openapi_tags,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    """Response payload for health-check endpoints."""

    message: str = Field(..., description="Human-readable health status.")


class WelcomeResponse(BaseModel):
    """Response payload for welcome endpoints."""

    message: str = Field(..., description="Human-readable welcome message.")


# PUBLIC_INTERFACE
@app.get(
    "/",
    response_model=HealthResponse,
    tags=["Health"],
    operation_id="health_check",
    summary="Health check",
    description="Returns a simple payload confirming the service is running.",
)
def health_check() -> HealthResponse:
    """
    Health check endpoint.

    Returns:
        HealthResponse: A simple message indicating the API is healthy.
    """
    return HealthResponse(message="Healthy")


# PUBLIC_INTERFACE
@app.get(
    "/welcome",
    response_model=WelcomeResponse,
    tags=["Welcome"],
    operation_id="get_welcome_message",
    summary="Get welcome message",
    description="Returns the welcome message for this application.",
)
def get_welcome_message() -> WelcomeResponse:
    """
    Get a welcome message.

    Returns:
        WelcomeResponse: A welcome message payload.
    """
    return WelcomeResponse(message="Welcome to the Welcome Message Service!")
