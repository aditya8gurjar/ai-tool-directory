# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from routes.tools import router as tools_router
from routes.search import router as search_router
from routes.workflows import router as workflows_router
from routes.health import router as health_router

load_dotenv()

app = FastAPI(
    title="AI Tool Directory API",
    description="Backend API for the AI Tool Directory project.",
    version="1.0.0"
)

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tools_router, prefix="/api/v1", tags=["Tools"])
app.include_router(search_router, prefix="/api/v1", tags=["Search"])
app.include_router(workflows_router, prefix="/api/v1", tags=["Workflows"])
app.include_router(health_router, prefix="/api/v1", tags=["Health"])

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "FastAPI backend is up and running!"}