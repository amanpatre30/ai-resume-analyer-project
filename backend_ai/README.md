# Backend Deployment (Render)

This backend is an Express API meant to run on Render.

## Environment variables

Add these in Render:

- `MONGODB_URI` - your MongoDB connection string
- `CORS_ORIGIN` - your frontend URL, for example `https://your-frontend.vercel.app`

## Run locally

1. Create `backend_ai/.env` with:

```env
MONGODB_URI=your-local-mongodb-uri
CORS_ORIGIN=http://localhost:5173
```

2. Install dependencies:

```bash
cd backend_ai
npm install
```

3. Start the backend:

```bash
npm run dev
```

## Render settings

- Root directory: `backend_ai`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment: `Node 18` or later

### Deploying with root render.yaml

This repository includes `render.yaml` at the project root. If you deploy the repo from Render, it will create both frontend and backend services automatically.
