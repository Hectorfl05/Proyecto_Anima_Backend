import uvicorn
from fastapi import FastAPI, Request, APIRouter, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

import os
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse


app = FastAPI()


# --- CORS configuration ---
# Allow typical dev origins (React dev server on :3000) and Vite (:5173) if used.
origins = [
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- API models and in-memory storage (replace with real DB later) ---
class Item(BaseModel):
    id: int
    name: str
    description: str


class Items(BaseModel):
    items: List[Item]


class AuthPayload(BaseModel):
    email: str
    password: str


temp_memory_db = {"Items": []}


# --- API router (backend controls client <-> DB communication here) ---
api_router = APIRouter(prefix="/api")


@api_router.get("/items", response_model=Items)
async def get_items():
    return Items(items=temp_memory_db["Items"])


@api_router.post("/items", response_model=Item, status_code=status.HTTP_201_CREATED)
async def add_item(item: Item):
    # In a real app you'd validate and persist to a database here
    temp_memory_db["Items"].append(item)
    return item


@api_router.post("/auth/signin")
async def signin(payload: AuthPayload):
    """Placeholder signin endpoint.

    Replace with real authentication (DB lookup, password hashing, token creation).
    """
    # Example placeholder: accept any non-empty email/password
    if not payload.email or not payload.password:
        raise HTTPException(status_code=400, detail="Email and password required")
    # Return a dummy token (replace with JWT or session creation)
    return {"access_token": "fake-token-for-{}".format(payload.email), "token_type": "bearer"}


app.include_router(api_router)


# Serve React build (if present) so SPA routes like /signin work when navigating directly.
CLIENT_BUILD_DIR = os.path.join(os.path.dirname(__file__), '..', 'client', 'build')
if os.path.isdir(CLIENT_BUILD_DIR):
    # Mount static files so built assets (e.g. /static/js/...) are served
    app.mount("/static", StaticFiles(directory=os.path.join(CLIENT_BUILD_DIR, 'static')), name="static")


@app.get("/"
)
async def serve_index():
    """Serve index.html at root when build exists."""
    index_path = os.path.join(CLIENT_BUILD_DIR, 'index.html')
    if os.path.isfile(index_path):
        return FileResponse(index_path, media_type='text/html')
    return {"detail": "API root. Build not found."}


@app.get("/{full_path:path}")
async def spa_fallback(request: Request, full_path: str):
    """Return the React app's index.html for any path not handled by API routes.

    This enables direct navigation or page refresh on routes like /signin to load
    the client-side router.
    """
    index_path = os.path.join(CLIENT_BUILD_DIR, 'index.html')
    if os.path.isfile(index_path):
        return HTMLResponse(open(index_path, 'r', encoding='utf-8').read())
    return {"detail": "Not Found"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)