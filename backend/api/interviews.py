import os
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from datetime import datetime
import asyncio
from services.nlp_analyzer import analyze_text

router = APIRouter()

@router.post("/process-audio")
async def process_audio(
    audio: UploadFile = File(...),
    question_context: Optional[str] = Form(None)
):
    """
    Endpoint to receive audio, process it with AI, and return feedback.
    """
    if not audio.filename.endswith(('.wav', '.mp3', '.m4a', '.webm', '.ogg', 'blob')):
        pass # allow blob type
    
    audio_bytes = await audio.read()
    
    # Here is where Whisper API would be called.
    # Since we need an OPENAI API Key, we will fall back to a mock transcription 
    # if it's not set, to allow testing the UI.
    api_key = os.getenv("OPENAI_API_KEY")
    
    if api_key:
        try:
            from openai import AsyncOpenAI
            import io
            client = AsyncOpenAI(api_key=api_key)
            
            # Whisper requires a filename ending with a known audio extension
            audio_file = io.BytesIO(audio_bytes)
            audio_file.name = "audio.mp3"
            
            transcript_res = await client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file
            )
            transcription = transcript_res.text
        except Exception as e:
            print("OpenAI Whisper Error:", e)
            transcription = "We failed to process the audio via Whisper API. This is a fallback mock transcription."
    else:
        # Provide a realistic mock transcription
        await asyncio.sleep(2) # Simulate processing time
        if question_context and "challenge" in question_context.lower():
            transcription = "Uh, so one time I had a difficult challenge when the server went down. We, um, had to debug it all night. It was stressful but we fixed it."
        else:
            transcription = "I think I would be a great fit for this position because I have five years of experience in full stack development."

    # Analyze the transcription using our local NLTK/Vader pipeline
    analysis = analyze_text(transcription)

    return {
        "status": "success",
        "processed_at": datetime.utcnow().isoformat(),
        "transcription": transcription,
        "analysis": analysis
    }
