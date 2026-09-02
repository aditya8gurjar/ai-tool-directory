# backend/seed_more_tools.py
from database import SessionLocal
from models import Tool

more_tools = [
    {"name": "Copy.ai", "slug": "copy-ai", "description": "AI copywriting tool for marketers to generate blogs, social posts, and ads.", "website_url": "https://www.copy.ai", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Rytr", "slug": "rytr", "description": "An AI writing assistant that helps you create high-quality content in seconds.", "website_url": "https://rytr.me", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Writesonic", "slug": "writesonic", "description": "AI writer for creating SEO-optimized articles, blogs, and landing pages.", "website_url": "https://writesonic.com", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Wordtune", "slug": "wordtune", "description": "AI tool to rewrite, paraphrase, and improve your sentences.", "website_url": "https://www.wordtune.com", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Anyword", "slug": "anyword", "description": "AI copywriting platform that predicts the performance of your text.", "website_url": "https://anyword.com", "category": "Text Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Peppertype", "slug": "peppertype", "description": "AI content generator for marketing teams.", "website_url": "https://peppertype.ai", "category": "Text Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Inferkit", "slug": "inferkit", "description": "Advanced AI text generator for writers and developers.", "website_url": "https://app.inferkit.com", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "NovelAI", "slug": "novelai", "description": "AI-assisted story writing and text-to-image synthesis.", "website_url": "https://novelai.net", "category": "Text Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Character.AI", "slug": "character-ai", "description": "Create and interact with AI characters for conversation and storytelling.", "website_url": "https://character.ai", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "DeepL", "slug": "deepl", "description": "AI-powered translation tool for accurate language translation.", "website_url": "https://www.deepl.com", "category": "Text Generation", "pricing": "Freemium", "status": "Active"},

    # Image Generation
    {"name": "Canva AI", "slug": "canva-ai", "description": "Design tool with integrated AI for generating images and text from prompts.", "website_url": "https://www.canva.com", "category": "Image Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Let's Enhance", "slug": "lets-enhance", "description": "AI image upscaler and enhancer for low-quality photos.", "website_url": "https://letsenhance.io", "category": "Image Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Remove.bg", "slug": "remove-bg", "description": "AI tool to instantly remove backgrounds from images.", "website_url": "https://www.remove.bg", "category": "Image Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Craiyon", "slug": "craiyon", "description": "Free AI image generator that draws art from text prompts.", "website_url": "https://www.craiyon.com", "category": "Image Generation", "pricing": "Free", "status": "Active"},
    {"name": "Playground AI", "slug": "playground-ai", "description": "Create and edit images using AI with a canvas interface.", "website_url": "https://playground.com", "category": "Image Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Leonardo AI", "slug": "leonardo-ai", "description": "Generate game assets and high-quality art with AI models.", "website_url": "https://leonardo.ai", "category": "Image Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Nightcafe", "slug": "nightcafe", "description": "AI Art Generator with multiple styles and algorithms.", "website_url": "https://creator.nightcafe.studio", "category": "Image Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Wombo Dream", "slug": "wombo-dream", "description": "AI app that turns text into whimsical art.", "website_url": "https://www.wombo.art", "category": "Image Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "StarryAI", "slug": "starryai", "description": "AI art generator app that creates artworks from text.", "website_url": "https://starryai.com", "category": "Image Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Artbreeder", "slug": "artbreeder", "description": "AI tool to breed and mix images to create new art.", "website_url": "https://www.artbreeder.com", "category": "Image Generation", "pricing": "Freemium", "status": "Active"},

    # Video Generation
    {"name": "InVideo AI", "slug": "invideo-ai", "description": "AI text-to-video generator that creates full videos with scripts and voiceovers.", "website_url": "https://invideo.io/ai", "category": "Video Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Luma Dream Machine", "slug": "luma-dream-machine", "description": "Fast and high-quality AI video generator from text and images.", "website_url": "https://lumalabs.ai/dream-machine", "category": "Video Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Kling AI", "slug": "kling-ai", "description": "Advanced AI video generator for realistic text-to-video.", "website_url": "https://klingai.com", "category": "Video Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "HeyGen", "slug": "heygen", "description": "AI video generator with realistic avatars and voice translation.", "website_url": "https://www.heygen.com", "category": "Video Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "D-ID", "slug": "d-id", "description": "AI video generator that animates faces from a single image.", "website_url": "https://www.d-id.com", "category": "Video Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Colossyan", "slug": "colossyan", "description": "AI video platform for creating workplace training videos.", "website_url": "https://www.colossyan.com", "category": "Video Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Fliki", "slug": "fliki", "description": "AI video generator that turns text into videos with AI voices.", "website_url": "https://fliki.ai", "category": "Video Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Veed.io", "slug": "veed-io", "description": "Online video editor with AI features for subtitles and cutting.", "website_url": "https://www.veed.io", "category": "Video Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Wisdom AI", "slug": "wisdom-ai", "description": "AI video editor that finds highlights in long videos.", "website_url": "https://www.wisdomai.com", "category": "Video Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Pictory", "slug": "pictory", "description": "AI video generator that turns long text into short videos.", "website_url": "https://pictory.ai", "category": "Video Generation", "pricing": "Paid", "status": "Active"},

    # Audio Generation
    {"name": "Murf AI", "slug": "murf-ai", "description": "AI voiceover generator with studio-quality voices.", "website_url": "https://murf.ai", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Play.ht", "slug": "play-ht", "description": "AI text-to-speech generator and AI voice cloning.", "website_url": "https://play.ht", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Speechify", "slug": "speechify", "description": "AI text-to-speech app that reads text aloud.", "website_url": "https://speechify.com", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Resemble AI", "slug": "resemble-ai", "description": "AI voice cloning and text-to-speech platform.", "website_url": "https://www.resemble.ai", "category": "Audio Generation", "pricing": "Paid", "status": "Active"},
    {"name": "VoiceMod", "slug": "voicemod", "description": "Real-time AI voice changer and soundboard.", "website_url": "https://www.voicemod.net", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Boomy", "slug": "boomy", "description": "AI music generator that lets you create original songs.", "website_url": "https://boomy.com", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "AIVA", "slug": "aiva", "description": "AI music composer for soundtracks and themes.", "website_url": "https://www.aiva.ai", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "Soundraw", "slug": "soundraw", "description": "AI music generator for creators to make custom tracks.", "website_url": "https://soundraw.io", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},
    {"name": "LALAL.AI", "slug": "lalal-ai", "description": "AI stem separation tool to remove vocals and instruments.", "website_url": "https://www.lalal.ai", "category": "Audio Generation", "pricing": "Paid", "status": "Active"},
    {"name": "Kits AI", "slug": "kits-ai", "description": "AI voice generator for musicians to create vocal models.", "website_url": "https://www.kits.ai", "category": "Audio Generation", "pricing": "Freemium", "status": "Active"},

    # Coding
    {"name": "Codeium", "slug": "codeium", "description": "Free AI code completion and chat tool for developers.", "website_url": "https://codeium.com", "category": "Coding", "pricing": "Free", "status": "Active"},
    {"name": "Sourcegraph Cody", "slug": "sourcegraph-cody", "description": "AI coding assistant that understands your entire codebase.", "website_url": "https://about.sourcegraph.com/cody", "category": "Coding", "pricing": "Freemium", "status": "Active"},
    {"name": "Tabnine", "slug": "tabnine", "description": "AI code assistant that keeps your code private.", "website_url": "https://www.tabnine.com", "category": "Coding", "pricing": "Freemium", "status": "Active"},
    {"name": "Replit Ghostwriter", "slug": "replit-ghostwriter", "description": "AI pair programmer integrated into the Replit IDE.", "website_url": "https://replit.com/ghostwriter", "category": "Coding", "pricing": "Freemium", "status": "Active"},
    {"name": "Amazon Q", "slug": "amazon-q", "description": "AWS AI coding assistant for cloud development.", "website_url": "https://aws.amazon.com/q", "category": "Coding", "pricing": "Paid", "status": "Active"},
    {"name": "Snyk DeepCode", "slug": "snyk-deepcode", "description": "AI-powered code analyzer for security vulnerabilities.", "website_url": "https://snyk.io/platform/deepcode-ai", "category": "Coding", "pricing": "Freemium", "status": "Active"},
    {"name": "Phind", "slug": "phind", "description": "AI search engine for developers.", "website_url": "https://www.phind.com", "category": "Coding", "pricing": "Freemium", "status": "Active"},
    {"name": "MutableAI", "slug": "mutableai", "description": "AI tool to rapidly modify and refactor code.", "website_url": "https://mutable.ai", "category": "Coding", "pricing": "Freemium", "status": "Active"},
    {"name": "Vercel AI SDK", "slug": "vercel-ai-sdk", "description": "SDK for building AI-powered applications.", "website_url": "https://sdk.vercel.ai", "category": "Coding", "pricing": "Free", "status": "Active"},
    {"name": "v0 by Vercel", "slug": "v0-vercel", "description": "AI tool to generate React UI components from text.", "website_url": "https://v0.dev", "category": "Coding", "pricing": "Freemium", "status": "Active"},

    # Productivity
    {"name": "Taskade", "slug": "taskade", "description": "AI-powered task manager and workspace for teams.", "website_url": "https://www.taskade.com", "category": "Productivity", "pricing": "Freemium", "status": "Active"},
    {"name": "Mem", "slug": "mem", "description": "AI note-taking app that organizes itself.", "website_url": "https://mem.ai", "category": "Productivity", "pricing": "Freemium", "status": "Active"},
    {"name": "Todoist AI", "slug": "todoist-ai", "description": "AI assistant for managing tasks and to-do lists.", "website_url": "https://todoist.com/ai", "category": "Productivity", "pricing": "Freemium", "status": "Active"},
    {"name": "Motion", "slug": "motion", "description": "AI calendar that plans your day and schedules tasks.", "website_url": "https://www.usemotion.com", "category": "Productivity", "pricing": "Paid", "status": "Active"},
    {"name": "Rewind AI", "slug": "rewind-ai", "description": "AI tool that records your screen so you can search your history.", "website_url": "https://www.rewind.ai", "category": "Productivity", "pricing": "Freemium", "status": "Active"},
    {"name": "Otter.ai", "slug": "otter-ai", "description": "AI meeting assistant that transcribes and summarizes.", "website_url": "https://otter.ai", "category": "Productivity", "pricing": "Freemium", "status": "Active"},
    {"name": "Fireflies AI", "slug": "fireflies-ai", "description": "AI notetaker for voice conversations on Zoom/Meet.", "website_url": "https://fireflies.ai", "category": "Productivity", "pricing": "Freemium", "status": "Active"},
    {"name": "ClickUp AI", "slug": "clickup-ai", "description": "AI project management assistant for writing and summarizing.", "website_url": "https://clickup.com/ai", "category": "Productivity", "pricing": "Freemium", "status": "Active"},
    {"name": "Tome", "slug": "tome", "description": "AI presentation generator from a single prompt.", "website_url": "https://tome.app", "category": "Productivity", "pricing": "Freemium", "status": "Active"},
    {"name": "Beautiful.ai", "slug": "beautiful-ai", "description": "AI presentation software that designs itself.", "website_url": "https://www.beautiful.ai", "category": "Productivity", "pricing": "Paid", "status": "Active"},

    # Search
    {"name": "You.com", "slug": "you-com", "description": "AI search engine that summarizes the web for you.", "website_url": "https://you.com", "category": "Search", "pricing": "Freemium", "status": "Active"},
    {"name": "Phind Search", "slug": "phind-search", "description": "AI search engine optimized for developers.", "website_url": "https://www.phind.com", "category": "Search", "pricing": "Freemium", "status": "Active"},
    {"name": "Brave Leo", "slug": "brave-leo", "description": "AI assistant integrated into the Brave browser.", "website_url": "https://brave.com/leo", "category": "Search", "pricing": "Freemium", "status": "Active"},
    {"name": "Microsoft Copilot", "slug": "microsoft-copilot", "description": "AI assistant for search and productivity in Windows.", "website_url": "https://copilot.microsoft.com", "category": "Search", "pricing": "Freemium", "status": "Active"},
    {"name": "Waldo AI", "slug": "waldo-ai", "description": "AI search engine optimized for work and research.", "website_url": "https://www.waldo.fyi", "category": "Search", "pricing": "Paid", "status": "Active"},
    {"name": "Exa", "slug": "exa", "description": "AI-powered search API for developers.", "website_url": "https://exa.ai", "category": "Search", "pricing": "Freemium", "status": "Active"},
    {"name": "Andi Search", "slug": "andi-search", "description": "AI search assistant that answers questions directly.", "website_url": "https://andisearch.com", "category": "Search", "pricing": "Free", "status": "Active"},
    {"name": "Kagi", "slug": "kagi", "description": "Premium search engine with AI assistant features.", "website_url": "https://kagi.com", "category": "Search", "pricing": "Paid", "status": "Active"},
    {"name": "GigaBrain", "slug": "gigabrain", "description": "AI search that finds answers from Reddit threads.", "website_url": "https://gigabrain.io", "category": "Search", "pricing": "Freemium", "status": "Active"},
    {"name": "Bing Chat", "slug": "bing-chat", "description": "AI-powered conversational search by Microsoft.", "website_url": "https://www.bing.com/chat", "category": "Search", "pricing": "Free", "status": "Active"},

    # Automation
    {"name": "Make.com", "slug": "make-com", "description": "Visual platform for building AI automated workflows.", "website_url": "https://www.make.com", "category": "Automation", "pricing": "Freemium", "status": "Active"},
    {"name": "Bardeen AI", "slug": "bardeen-ai", "description": "AI browser extension to automate manual workflows.", "website_url": "https://bardeen.ai", "category": "Automation", "pricing": "Freemium", "status": "Active"},
    {"name": "Akkio", "slug": "akkio", "description": "AI data analytics and automation platform.", "website_url": "https://www.akkio.com", "category": "Automation", "pricing": "Paid", "status": "Active"},
    {"name": " Levity", "slug": "levity", "description": "AI tool to automate manual back-office processes.", "website_url": "https://www.levity.ai", "category": "Automation", "pricing": "Paid", "status": "Active"},
    {"name": "Albato", "slug": "albato", "description": "No-code platform to connect apps and automate with AI.", "website_url": "https://albato.com", "category": "Automation", "pricing": "Freemium", "status": "Active"},
    {"name": "Pipedream AI", "slug": "pipedream-ai", "description": "Developer platform to connect APIs and build AI pipelines.", "website_url": "https://pipedream.com", "category": "Automation", "pricing": "Freemium", "status": "Active"},
    {"name": "n8n", "slug": "n8n", "description": "Open-source workflow automation tool with AI nodes.", "website_url": "https://n8n.io", "category": "Automation", "pricing": "Freemium", "status": "Active"},
    {"name": "Zapier Central", "slug": "zapier-central", "description": "AI agents that work across your apps.", "website_url": "https://zapier.com/central", "category": "Automation", "pricing": "Freemium", "status": "Active"},
    {"name": "Latenode", "slug": "latenode", "description": "AI automation platform for building complex workflows.", "website_url": "https://latenode.com", "category": "Automation", "pricing": "Freemium", "status": "Active"},
    {"name": "Workato", "slug": "workato", "description": "Enterprise automation platform with AI features.", "website_url": "https://www.workato.com", "category": "Automation", "pricing": "Paid", "status": "Active"},
]

def seed_more():
    db = SessionLocal()
    try:
        # Check if already seeded
        existing = db.query(Tool).count()
        if existing > 20:
            print("Tools already expanded. Skipping.")
            return

        for data in more_tools:
            # Check if tool exists
            exists = db.query(Tool).filter(Tool.slug == data["slug"]).first()
            if not exists:
                tool = Tool(**data)
                db.add(tool)
        
        db.commit()
        print(f"Successfully added {len(more_tools)} more tools! Total is now {db.query(Tool).count()}.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_more()