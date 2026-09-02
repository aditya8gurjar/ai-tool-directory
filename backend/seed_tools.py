# backend/seed_tools.py
from database import SessionLocal
from models import Tool

# 20 AI tools to seed into the database
tools_data = [
    {"name": "ChatGPT", "slug": "chatgpt", "description": "An advanced AI chatbot capable of understanding and generating human-like text, answering questions, and writing code.", "website_url": "https://chat.openai.com", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Claude", "slug": "claude", "description": "A next-generation AI assistant designed to be helpful, harmless, and honest for text analysis and generation.", "website_url": "https://claude.ai", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Midjourney", "slug": "midjourney", "description": "An AI program that creates high-quality images from textual descriptions.", "website_url": "https://www.midjourney.com", "category": "Image Generation", "pricing": "Paid", "status": "Active"},
    {"name": "DALL-E 3", "slug": "dall-e-3", "description": "An AI image generator by OpenAI that creates realistic and artistic images from text prompts.", "website_url": "https://openai.com/dall-e-3", "category": "Image Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Stable Diffusion", "slug": "stable-diffusion", "description": "An open-source AI model that generates images from text, widely used for local and custom generation.", "website_url": "https://stability.ai", "category": "Image Generation", "pricing": "Free", "status": "Active"},
    {"name": "Synthesia", "slug": "synthesia", "description": "An AI video generation platform to create videos with AI avatars and voiceovers.", "website_url": "https://www.synthesia.io", "category": "Video Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Runway", "slug": "runway", "description": "A suite of AI tools for video editing, generation, and visual effects.", "website_url": "https://runwayml.com", "category": "Video Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Pika Labs", "slug": "pika-labs", "description": "An AI video generator that creates cinematic videos from text or images.", "website_url": "https://pika.art", "category": "Video Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "ElevenLabs", "slug": "elevenlabs", "description": "AI voice generator and text-to-speech platform with realistic voices.", "website_url": "https://elevenlabs.io", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Descript", "slug": "descript", "description": "An AI-powered audio and video editor that lets you edit by editing text.", "website_url": "https://www.descript.com", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Suno AI", "slug": "suno-ai", "description": "Create full, high-quality songs with lyrics and vocals from simple text prompts.", "website_url": "https://suno.com", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "GitHub Copilot", "slug": "github-copilot", "description": "An AI pair programmer that suggests code completions inside your IDE.", "website_url": "https://github.com/features/copilot", "category": "Coding", "pricing": "Paid", "status": "Active"},
    {"name": "Cursor", "slug": "cursor", "description": "The AI-first code editor designed to help you build software faster.", "website_url": "https://cursor.sh", "category": "Coding", "pricing": "Freemium", "status": "Active"},
    {"name": "Tabnine", "slug": "tabnine", "description": "AI code assistant that delivers whole-line and full-function completions.", "website_url": "https://www.tabnine.com", "category": "Coding", "pricing": "Freemium", "status": "Active"},
    {"name": "Notion AI", "slug": "notion-ai", "description": "An AI assistant integrated into Notion for writing, summarizing, and brainstorming.", "website_url": "https://www.notion.so/product/ai", "category": "Productivity", "pricing": "Paid", "status": "Active"},
    {"name": "Perplexity AI", "slug": "perplexity-ai", "description": "An AI-powered search engine that provides answers with sources.", "website_url": "https://www.perplexity.ai", "category": "Search", "pricing": "Freemium", "status": "Active"},
    {"name": "Zapier AI", "slug": "zapier-ai", "description": "Automate tasks by connecting AI to thousands of apps without writing code.", "website_url": "https://zapier.com", "category": "Productivity", "pricing": "Freemium", "status": "Active"},
    {"name": "Grammarly", "slug": "grammarly", "description": "AI-powered writing assistant that checks grammar, tone, and clarity.", "website_url": "https://www.grammarly.com", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Jasper", "slug": "jasper", "description": "An AI platform built for marketers to create on-brand content.", "website_url": "https://www.jasper.ai", "category": "Text Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Gamma", "slug": "gamma", "description": "An AI tool to generate beautiful presentations, documents, and websites from text.", "website_url": "https://gamma.app", "category": "Productivity", "pricing": "Freemium", "status": "Active"}
]

def seed_database():
    db = SessionLocal()
    try:
        # Delete existing tools to avoid duplicates
        db.query(Tool).delete()
        
        # Create Tool objects and add to DB
        for data in tools_data:
            tool = Tool(**data)
            db.add(tool)
            
        db.commit()
        print(f"Successfully seeded {len(tools_data)} AI tools into the database!")
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
    