# backend/generate_embeddings.py
from sentence_transformers import SentenceTransformer
from database import SessionLocal
from models import Tool

def generate_and_store_embeddings():
    print("Loading the AI model (all-MiniLM-L6-v2)...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("Model loaded!\n")
    
    db = SessionLocal()
    
    try:
        # Get all tools from the database
        tools = db.query(Tool).all()
        print(f"Found {len(tools)} tools in the database.")
        
        for tool in tools:
            # Combine useful fields into one searchable text string
            searchable_text = f"{tool.name} {tool.category} {tool.description}"
            
            # Generate the 384-dimensional embedding
            embedding = model.encode(searchable_text)
            
            # Save the embedding to the tool object
            tool.embedding = embedding.tolist() # Convert numpy array to list for PostgreSQL
            
            print(f"Generated embedding for: {tool.name}")
        
        # Commit all changes to the database at once
        db.commit()
        print("\nSuccess! All embeddings have been saved to Supabase.")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    generate_and_store_embeddings()