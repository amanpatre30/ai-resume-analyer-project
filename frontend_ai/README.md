# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Deploying to Vercel

This frontend is built with Vite and can be deployed to Vercel as a static site.

1. Add an environment variable in Vercel:
   - `VITE_API_BASE_URL=https://your-backend.onrender.com`
2. Set the project root to the `frontend_ai` folder.
3. Use these build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Keep using `frontend_ai/vercel.json` for SPA routing fallback.

## Deploying to Railway

Railway can also host this frontend as a web service.

1. In Railway, create a new project and choose the `frontend_ai` folder.
2. Set the build command to:
   - `npm install && npm run build`
3. Set the start command to:
   - `npm run start`
4. Add an environment variable:
   - `VITE_API_BASE_URL=https://your-backend.onrender.com`

Railway will provide a `PORT` automatically, and `serve -s dist` will listen on that port.

## Deploying to Render

Render can deploy both backend and frontend from this repository using `render.yaml`.

1. Add the repository to Render.
2. Render will detect `render.yaml` at the repository root.
3. It will create two services:
   - `ai-aman-backend` from `backend_ai`
   - `ai-aman-frontend` from `frontend_ai`
4. Set these environment variables for the frontend service:
   - `VITE_API_BASE_URL=https://your-backend.onrender.com`
5. Set these environment variables for the backend service:
   - `MONGODB_URI=your-production-mongodb-uri`
   - `CORS_ORIGIN=https://your-frontend.onrender.com`

### Local development

Create `frontend_ai/.env` with:

```env
VITE_API_BASE_URL=http://localhost:4000
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
