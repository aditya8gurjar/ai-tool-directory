# backend/tests/test_api.py
import pytest
from fastapi.testclient import TestClient
from main import app
from sentence_transformers import SentenceTransformer

# Create a test client to simulate API calls
client = TestClient(app)

def test_health_check():
    """Test if the health endpoint returns 200 and healthy status"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"

def test_get_all_tools():
    """Test if the tools endpoint returns a list of tools"""
    response = client.get("/api/v1/tools?limit=20")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0  # Make sure we actually have tools

def test_get_single_tool_by_slug():
    """Test if we can fetch a specific tool (ChatGPT)"""
    response = client.get("/api/v1/tools/chatgpt")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "ChatGPT"

def test_embedding_dimension():
    """Test if the AI model still returns 384-dimensional vectors"""
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embedding = model.encode("Test sentence for dimension")
    assert len(embedding) == 384  # Must be exactly 384