# backend/init_db.py
from database import engine, Base
from models import Tool
from sqlalchemy import text

print("Enabling pgvector extension in Supabase...")
# Connect and run the raw SQL to enable the extension
with engine.connect() as connection:
    connection.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
    connection.commit()

print("Creating tables in PostgreSQL...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully!")