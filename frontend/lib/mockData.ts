// frontend/src/lib/mockData.ts

export interface Tool {
  id: number;
  name: string;
  slug: string;
  description: string;
  website_url: string;
  category: string;
  pricing: string;
  status: string;
}

export const mockTools: Tool[] = [
  {
    id: 1,
    name: "ChatGPT",
    slug: "chatgpt",
    description: "An advanced AI chatbot capable of understanding and generating human-like text, answering questions, and writing code.",
    website_url: "https://chat.openai.com",
    category: "Text Generation",
    pricing: "Freemium",
    status: "Active"
  },
  {
    id: 2,
    name: "Midjourney",
    slug: "midjourney",
    description: "An independent research lab that produces an artificial intelligence program that creates images from textual descriptions.",
    website_url: "https://www.midjourney.com",
    category: "Image Generation",
    pricing: "Paid",
    status: "Active"
  },
  {
    id: 3,
    name: "Synthesia",
    slug: "synthesia",
    description: "An AI video generation platform that allows users to create videos with AI avatars and voiceovers in multiple languages.",
    website_url: "https://www.synthesia.io",
    category: "Video Generation",
    pricing: "Paid",
    status: "Active"
  },
  {
    id: 4,
    name: "ElevenLabs",
    slug: "elevenlabs",
    description: "A voice AI research and deployment company that creates realistic AI voices for text-to-speech and voice cloning.",
    website_url: "https://elevenlabs.io",
    category: "Audio Generation",
    pricing: "Freemium",
    status: "Active"
  },
  {
    id: 5,
    name: "GitHub Copilot",
    slug: "github-copilot",
    description: "An AI pair programmer that suggests code completions and entire functions in real-time as you type.",
    website_url: "https://github.com/features/copilot/features/copilot",
    category: "Coding",
    pricing: "Paid",
    status: "Active"
  },
  {
    id: 6,
    name: "Notion AI",
    slug: "notion-ai",
    description: "An AI assistant integrated into Notion that helps with writing, summarizing, brainstorming, and organizing notes.",
    website_url: "https://www.notion.so/product/ai",
    category: "Productivity",
    pricing: "Paid",
    status: "Active"
  }
];

export const categories = [
  "Text Generation",
  "Image Generation",
  "Video Generation",
  "Audio Generation",
  "Coding",
  "Productivity"
];