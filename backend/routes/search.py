# backend/routes/search.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sentence_transformers import SentenceTransformer
from schemas import SearchRequest, SearchResult
from models import Tool
from database import get_db

router = APIRouter()

# Load the AI model once when the server starts
model = SentenceTransformer('all-MiniLM-L6-v2')

@router.post("/search/semantic", response_model=list[SearchResult])
async def semantic_search(request: SearchRequest, db: Session = Depends(get_db)):
    """
    Perform semantic search on AI tools.
    """
    # 1. Generate the embedding for the user's search query
    query_embedding = model.encode(request.query).tolist()
    
    # 2. Build the database query
    db_query = db.query(
        Tool,
        (1 - Tool.embedding.cosine_distance(query_embedding)).label('similarity')
    )
    
    # 3. Apply filters if provided
    if request.category:
        db_query = db_query.filter(Tool.category.ilike(f"%{request.category}%"))
    if request.pricing:
        db_query = db_query.filter(Tool.pricing.ilike(f"%{request.pricing}%"))
        
    # 4. Sort by similarity (closest vector first) and limit results
    db_query = db_query.order_by(Tool.embedding.cosine_distance(query_embedding))
    results = db_query.limit(request.limit).all()
    
    # 5. Format the response
    output = []
    for tool, similarity in results:
        output.append({
            "id": tool.id,
            "name": tool.name,
            "slug": tool.slug,
            "description": tool.description,
            "website_url": tool.website_url,
            "category": tool.category,
            "pricing": tool.pricing,
            "status": tool.status,
            "similarity": round(similarity, 4) # Round to 4 decimal places
        })
        
    return output