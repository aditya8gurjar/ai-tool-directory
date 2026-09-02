# backend/schemas.py
from pydantic import BaseModel
from typing import Optional, List

class ToolBase(BaseModel):
    name: str
    slug: str
    description: str
    website_url: str
    category: str
    pricing: str
    status: str

class ToolResponse(ToolBase):
    id: int

    class Config:
        from_attributes = True

# New Schemas for Semantic Search
class SearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    pricing: Optional[str] = None
    limit: int = 5

class SearchResult(ToolBase):
    id: int
    similarity: float

    class Config:
        from_attributes = True