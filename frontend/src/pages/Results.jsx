import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';

// A simple circular progress bar SVG component
const CircularProgress = ({ score, color, label }) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg viewBox="0 0 36 36" className="circular-chart" style={{ width: '120px', height: '120px' }}>
        <path className="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path className="circle"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          stroke={color}
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <text x="18" y="20.35" className="percentage">{score}%</text>
      </svg>
      <span style={{ marginTop: '1rem', fontWeight: 500, fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  );
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state || !location.state.result) {
    return <Navigate to="/" />;
  }

  const { result, question } = location.state;
  const analysis = result.analysis;

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="glass-panel" style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: 'var(--accent-color)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Question Replied To</h2>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 500 }}>"{question}"</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress score={analysis.grammar_score} color="var(--success)" label="Grammar Accuracy" />
        </div>
        <div className="glass-panel" style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress score={analysis.fluency_score} color="var(--accent-color)" label="Fluency Level" />
        </div>
        <div className="glass-panel" style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress score={analysis.confidence_score} color="var(--warning)" label="Confidence" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-panel">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle color="var(--success)" /> Transcription
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.1rem' }}>
            "{result.transcription}"
          </p>
        </div>
        
        <div className="glass-panel">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle color="var(--warning)" /> Improvement Feedback
          </h3>
          <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            {analysis.feedback.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{item}</li>
            ))}
          </ul>
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)' }}>
            <span style={{ fontWeight: 600 }}>Detected Sentiment: </span>
            <span style={{ color: 'var(--accent-color)' }}>{analysis.sentiment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
