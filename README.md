# welcome-message-service-2296-2308

This repository contains:
- `fastapi_backend/`: FastAPI API serving `GET /welcome`
- `frontend/`: React (Vite) UI that calls the backend `/welcome` endpoint

## Backend (FastAPI)

From `fastapi_backend/`, install and run:

```bash
pip install -r requirements.txt
uvicorn src.api.main:app --host 0.0.0.0 --port 3001
```

API docs: `http://localhost:3001/docs`

## Frontend (React + Vite)

From `frontend/`:

```bash
npm install
cp .env.example .env
npm run dev
```

Then open: `http://localhost:5173`

### Configure backend URL

The frontend calls `GET /welcome` using:

- `VITE_API_BASE_URL` (recommended for local dev), e.g. `http://localhost:3001`

If `VITE_API_BASE_URL` is not set, the frontend will attempt same-origin requests.
