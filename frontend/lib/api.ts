// frontend/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// Custom headers to bypass Ngrok's free tier browser warning
const ngrokHeaders = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json"
};

export async function fetchTools(limit = 100, category = "") {
  const url = category 
    ? `${API_URL}/tools?limit=${limit}&category=${encodeURIComponent(category)}`
    : `${API_URL}/tools?limit=${limit}`;
    
  const res = await fetch(url, { 
    headers: ngrokHeaders 
  });
  
  if (!res.ok) throw new Error("Failed to fetch tools");
  return res.json();
}

export async function fetchToolBySlug(slug: string) {
  const res = await fetch(`${API_URL}/tools/${slug}`, { 
    headers: ngrokHeaders
  });
  if (!res.ok) return null;
  return res.json();
}

export async function semanticSearch(query: string, limit = 5) {
  const res = await fetch(`${API_URL}/search/semantic`, {
    method: "POST",
    headers: ngrokHeaders,
    body: JSON.stringify({ query, limit }),
  });
  if (!res.ok) throw new Error("Search failed");
  return res.json();
}

export async function generateWorkflow(goal: string) {
  const res = await fetch(`${API_URL}/workflows/generate?goal=${encodeURIComponent(goal)}`, {
    method: "POST",
    headers: ngrokHeaders,
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Workflow generation failed");
  return res.json();
}

export async function triggerHealthCheck() {
  const res = await fetch(`${API_URL}/health-check/trigger`, {
    method: "POST",
    headers: ngrokHeaders,
    cache: 'no-store'
  });
  if (!res.ok) throw new Error("Health check failed");
  return res.json();
}

export async function fetchAlternatives(slug: string) {
  const res = await fetch(`${API_URL}/tools/${slug}/alternatives`, { 
    headers: ngrokHeaders,
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}