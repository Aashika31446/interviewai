from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.interviews import router as interviews_router

app = FastAPI(
    title="AI Interview Practice API",
    description="Backend API for the AI Interview Practice & Feedback System",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interviews_router, prefix="/api/interviews", tags=["Interviews"])

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Interview Practice API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
