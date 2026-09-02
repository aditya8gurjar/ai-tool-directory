# backend/routes/tools.py
from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List
from sqlalchemy.orm import Session
from schemas import ToolResponse
from models import Tool
from database import get_db

router = APIRouter()

@router.get("/tools", response_model=List[ToolResponse])
async def get_tools(
    db: Session = Depends(get_db),
    category: str = Query(None),
    pricing: str = Query(None),
    status: str = Query(None),
    limit: int = Query(10, ge=1, le=100),
    skip: int = Query(0, ge=0)
):
    query = db.query(Tool)
    if category:
        query = query.filter(Tool.category.ilike(f"%{category}%"))
    if pricing:
        query = query.filter(Tool.pricing.ilike(f"%{pricing}%"))
    if status:
        query = query.filter(Tool.status.ilike(f"%{status}%"))
        
    tools = query.offset(skip).limit(limit).all()
    return tools

@router.get("/tools/{slug}", response_model=ToolResponse)
async def get_tool_by_slug(slug: str, db: Session = Depends(get_db)):
    tool = db.query(Tool).filter(Tool.slug == slug).first()
    if tool:
        return tool
    raise HTTPException(status_code=404, detail="Tool not found")

@router.get("/tools/{slug}/alternatives", response_model=List[ToolResponse])
def get_cheaper_alternatives(slug: str, db: Session = Depends(get_db)):
    """
    Find cheaper alternatives for a given tool using semantic similarity.
    """
    tool = db.query(Tool).filter(Tool.slug == slug).first()
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    
    # Determine what is "cheaper"
    if tool.pricing == "Paid":
        cheaper_tiers = ["Freemium", "Free"]
    elif tool.pricing == "Freemium":
        cheaper_tiers = ["Free"]
    else:
        return [] # It's already Free, no cheaper alternatives!
        
    # Find tools with similar embeddings but cheaper pricing
    alternatives = db.query(Tool).filter(
        Tool.slug != slug,
        Tool.pricing.in_(cheaper_tiers)
    ).order_by(
        Tool.embedding.cosine_distance(tool.embedding)
    ).limit(3).all()
    
    return alternatives