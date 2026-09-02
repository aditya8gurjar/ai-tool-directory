# backend/routes/health.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Tool
from database import get_db
import httpx
import asyncio

router = APIRouter()

@router.post("/health-check/trigger")
async def trigger_health_check(db: Session = Depends(get_db)):
    """
    Triggers a health check for all tool URLs.
    """
    tools = db.query(Tool).all()
    
    async def check_tool(tool):
        try:
            # Request the website with a 5-second timeout
            async with httpx.AsyncClient() as client:
                response = await client.get(tool.website_url, timeout=5.0, follow_redirects=True)
                
                # If status code is less than 400, consider it active
                if response.status_code < 400:
                    tool.status = "Active"
                else:
                    tool.status = "Unavailable"
        except Exception:
            # If it times out or fails to connect, mark as unavailable
            tool.status = "Unavailable"

    # Run all checks concurrently for speed
    await asyncio.gather(*[check_tool(tool) for tool in tools])
    
    # Save all status updates to the database
    db.commit()
    
    active_count = len([t for t in tools if t.status == "Active"])
    unavailable_count = len([t for t in tools if t.status == "Unavailable"])
    
    return {
        "message": "Health check completed",
        "active": active_count,
        "unavailable": unavailable_count
    }