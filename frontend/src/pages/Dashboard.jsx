import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, TrendingUp, Award, Clock } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Elevate Your Interview Skills</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Practice with AI. Get real-time feedback on your grammar, fluency, and sentiment to land your dream job.
        </p>
        <button 
          className="btn btn-primary" 
          style={{ marginTop: '2rem', padding: '1rem 2rem', fontSize: '1.1rem' }}
          onClick={() => navigate('/interview')}
        >
          <Play size={20} /> Start New Interview
        </button>
      </header>

      <section>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '2rem' }}>Your Progress</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
                 <TrendingUp color="var(--success)" size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Average Score</h3>
            </div>
            <p style={{ fontSize: '3rem', fontWeight: 700 }}>86<span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/100</span></p>
            <p style={{ color: 'var(--success)', marginTop: '0.5rem', fontSize: '0.9rem' }}>+5% from last week</p>
          </div>

          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '12px' }}>
                 <Award color="var(--accent-color)" size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Interviews Completed</h3>
            </div>
            <p style={{ fontSize: '3rem', fontWeight: 700 }}>12</p>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>2 completed this week</p>
          </div>

          <div className="glass-panel">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px' }}>
                 <Clock color="var(--warning)" size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Practice Time</h3>
            </div>
            <p style={{ fontSize: '3rem', fontWeight: 700 }}>4.5<span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}> hrs</span></p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Dashboard;
