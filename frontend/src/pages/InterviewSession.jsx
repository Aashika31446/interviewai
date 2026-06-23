import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, StopCircle, Loader2 } from 'lucide-react';
import { processAudioToAI } from '../services/api';

const questions = [
  "Tell me about a time you faced a difficult challenge at work.",
  "Where do you see yourself in 5 years?",
  "Describe a situation where you had to lead a team."
];

const InterviewSession = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = handleStopEvent;
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Could not access microphone! Please ensure permissions are granted.");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleStopEvent = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    audioChunksRef.current = []; // reset
    setIsProcessing(true);

    try {
      // Send to Backend
      const result = await processAudioToAI(audioBlob, questions[questionIndex]);
      setIsProcessing(false);
      
      // Navigate to results page passing data
      navigate('/results', { state: { result, question: questions[questionIndex] } });
    } catch (error) {
      console.error("Failed to process:", error);
      alert("Failed to process audio. See console for details.");
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 2rem' }}>
      <div className="glass-panel" style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--accent-color)', marginBottom: '1rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Question {questionIndex + 1}</h2>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>"{questions[questionIndex]}"</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          {isProcessing ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <Loader2 className="animate-spin" size={64} color="var(--accent-color)" style={{ animation: 'spin 1s linear infinite' }} />
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>AI is analyzing your response...</p>
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <button 
              className={`btn ${isRecording ? 'btn-danger animate-pulse' : 'btn-primary'}`} 
              style={{ width: '120px', height: '120px', borderRadius: '50%', padding: 0 }}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
            >
              {isRecording ? <StopCircle size={48} /> : <Mic size={48} />}
            </button>
          )}
        </div>
        
        {!isProcessing && (
          <p style={{ marginTop: '2rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            {isRecording ? "Listening... click to stop recording" : "Click the microphone to start your answer"}
          </p>
        )}
      </div>
    </div>
  );
};

export default InterviewSession;
