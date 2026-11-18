import { useState, useEffect } from 'react';
import { checkBackendHealth } from './api/api';
import { Server, Code, Database, CheckCircle, AlertCircle, RefreshCw, Layers } from 'lucide-react';
import './App.css';

function App() {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [backendMessage, setBackendMessage] = useState('');
  const [backendTime, setBackendTime] = useState(null);

  const verifyBackend = async () => {
    setBackendStatus('checking');
    try {
      const res = await checkBackendHealth();
      setBackendStatus('online');
      setBackendMessage(res.data.message || 'Connected to Spring Boot API');
      setBackendTime(res.data.timestamp);
    } catch (err) {
      setBackendStatus('offline');
      setBackendMessage('Backend offline (Run: .\\mvnw.cmd spring-boot:run)');
    }
  };

  useEffect(() => {
    verifyBackend();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <span className="badge">🚀 7M Hackathon Workspace</span>
        <h1 className="title">Ready to Build</h1>
        <p className="subtitle">
          Your full-stack environment is pre-configured and ready for development.
        </p>
      </header>

      <div className="grid">
        {/* Frontend Card */}
        <div className="card">
          <div className="card-header">
            <Code size={24} color="#60a5fa" />
            <h2 className="card-title">Frontend (React + Vite)</h2>
          </div>
          <p className="card-desc">
            React 19 with Vite, Axios, React Router DOM, and Lucide icons.
          </p>
          <div className="status-box">
            <span>Dev Server</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="status-dot status-online"></span>
              <strong style={{ color: '#10b981' }}>Active (Port 5173)</strong>
            </div>
          </div>
          <div className="code-box">npm run dev</div>
        </div>

        {/* Backend Card */}
        <div className="card">
          <div className="card-header">
            <Server size={24} color="#a855f7" />
            <h2 className="card-title">Backend (Spring Boot)</h2>
          </div>
          <p className="card-desc">
            Java 21 REST API with Maven wrapper, JPA, Swagger UI, and CORS enabled.
          </p>
          <div className="status-box">
            <span>API Status</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={`status-dot ${backendStatus === 'online' ? 'status-online' : 'status-offline'}`}></span>
              <strong style={{ color: backendStatus === 'online' ? '#10b981' : '#f59e0b' }}>
                {backendStatus === 'online' ? 'Connected (Port 8080)' : 'Offline / Waiting'}
              </strong>
            </div>
          </div>
          {backendTime && (
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
              Timestamp: {backendTime}
            </p>
          )}
          <button className="btn" onClick={verifyBackend}>
            <RefreshCw size={16} /> Test Backend Connection
          </button>
        </div>

        {/* Database Card */}
        <div className="card">
          <div className="card-header">
            <Database size={24} color="#ec4899" />
            <h2 className="card-title">Database & Docs</h2>
          </div>
          <p className="card-desc">
            Pre-configured MySQL properties and schema scripts ready to load.
          </p>
          <div className="status-box">
            <span>Database</span>
            <strong>MySQL (hackathon_db)</strong>
          </div>
          <div className="code-box">database/schema.sql</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <Layers size={22} color="#818cf8" />
          <h3 style={{ fontSize: '1.1rem' }}>Next Steps for Development</h3>
        </div>
        <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: '1.8' }}>
          <li>
            <strong style={{ color: '#f8fafc' }}>Backend:</strong> Add your entities in <code>backend/src/main/java/com/hackathon/backend/model</code> and controllers in <code>controller</code>.
          </li>
          <li>
            <strong style={{ color: '#f8fafc' }}>Frontend:</strong> Add UI views in <code>frontend/src/pages</code> and API endpoints in <code>frontend/src/api/api.js</code>.
          </li>
          <li>
            <strong style={{ color: '#f8fafc' }}>Swagger Docs:</strong> Open <code>http://localhost:8080/swagger-ui.html</code> once backend is started to test APIs interactively.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
