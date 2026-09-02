# backend/models.py
from sqlalchemy import Column, Integer, String, DateTime, func
from pgvector.sqlalchemy import Vector
from database import Base

class Tool(Base):
    __tablename__ = "ai_tools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    description = Column(String)
    website_url = Column(String)
    logo_url = Column(String, nullable=True)
    category = Column(String, index=True)
    pricing = Column(String, index=True)
    status = Column(String, default="Active")
    
    # The vector column for our AI embeddings!
    embedding = Column(Vector(384), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())