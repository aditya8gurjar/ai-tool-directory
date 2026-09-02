# backend/routes/workflows.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sentence_transformers import SentenceTransformer
from models import Tool
from database import get_db

router = APIRouter()

# Load AI model for semantic search
model = SentenceTransformer('all-MiniLM-L6-v2')

@router.post("/workflows/generate")
async def generate_workflow(goal: str, db: Session = Depends(get_db)):
    """
    Generates a multi-step workflow for a given goal using a mock LLM and semantic search.
    """
    if not goal:
        raise HTTPException(status_code=400, detail="Goal is required")

    # 1. Mock LLM: Hardcode steps based on the goal to bypass API keys
    if "video" in goal.lower():
        steps = ["Write a video script", "Generate AI voiceover", "Create AI video", "Design thumbnail"]
    elif "music" in goal.lower() or "song" in goal.lower():
        steps = ["Write lyrics", "Generate music and vocals", "Mix and master audio"]
    else:
        steps = ["Brainstorm ideas", "Write content", "Generate media", "Edit and publish"]

    # 2. For each step, use our semantic search to find the best tool
    workflow = []
    for step in steps:
        # Generate embedding for the step
        query_embedding = model.encode(step).tolist()
        
        # Search database for closest tool
        tool = db.query(Tool).order_by(Tool.embedding.cosine_distance(query_embedding)).first()
        
        workflow.append({
            "step": step,
            "tool_name": tool.name if tool else "None",
            "tool_slug": tool.slug if tool else "",
            "website_url": tool.website_url if tool else "",
            "category": tool.category if tool else ""
        })

    return {"goal": goal, "workflow": workflow}