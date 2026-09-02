# backend/test_embedding.py
from sentence_transformers import SentenceTransformer

# Load the pre-trained model
print("Loading the AI model (all-MiniLM-L6-v2)...")
model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded successfully!\n")

# A test sentence (similar to a tool description)
text = "I need an AI to turn my script into a video."
print(f"Input text: {text}")

# Generate the embedding
embedding = model.encode(text)

# Check the dimension
print(f"Embedding dimension: {len(embedding)}")
print("First 5 numbers of the vector:", embedding[:5])