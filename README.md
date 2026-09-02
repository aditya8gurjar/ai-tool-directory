# AI Director

AI Director is a full-stack directory application featuring an AI Tool catalog and Workflow Generator.

## Project Structure

```
AI DIRECTOR/
│
├── ngrok.exe               # Downloaded ngrok executable (optional for tunneling)
├── .gitignore              # Git ignore configuration
├── README.md               # Project documentation
│
├── frontend/               # Next.js Frontend Application
│   ├── app/
│   │   ├── admin/          # Admin management route
│   │   ├── categories/     # Category listing route
│   │   ├── search/         # AI Tool search route
│   │   ├── tools/          # Tool details & list route
│   │   ├── workflows/       # AI Workflow Generator route
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # UI components
│   ├── lib/                # API helpers and utilities
│   ├── package.json        # Dependencies & scripts
│   └── ...
│
└── backend/                # FastAPI Backend Application
    ├── routes/
    │   ├── health.py       # Health check API route
    │   ├── search.py       # Search API route
    │   ├── tools.py        # Tools API route
    │   └── workflows.py    # Workflow generator API route
    ├── main.py             # FastAPI entrypoint
    ├── database.py         # Database connection setup
    ├── models.py           # Database models
    ├── requirements.txt    # Python dependencies
    ├── venv/               # Python virtual environment
    └── ...
```

## Setup & Running

### Backend (FastAPI)

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Activate virtual environment:
   - Windows: `venv\Scripts\activate`
   - Linux/macOS: `source venv/bin/activate`
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend (Next.js)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
