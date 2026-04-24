import React from 'react';
import { History, Trash2, FileText } from 'lucide-react';
import { getSessions, clearSessions } from '../utils/sessionStorage';

export default function SessionHistory({ sessions, onClear, onViewReport }) {
  return (
    <div className="panel">
      <div className="panel-title">
        <span>Session History</span>
        <button onClick={onClear} className="clear-btn" title="Clear All">
          <Trash2 size={14} />
        </button>
      </div>
      
      <div className="history-list">
        {sessions.length === 0 ? (
          <p className="empty-msg">No sessions yet. Finish a workout to see results!</p>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="history-card">
              <div className="card-top">
                <span className="ex-name">{session.exercise}</span>
                <span className="ex-date">{new Date(session.timestamp || session.date).toLocaleDateString()}</span>
              </div>
              <div className="card-stats">
                <div className="mini-stat">
                  <span className="stat-label">Reps</span>
                  <span className="stat-val">{session.reps}</span>
                </div>
                <div className="mini-stat">
                  <span className="stat-label">Avg ROM</span>
                  <span className="stat-val">{session.romScore ?? 0}%</span>
                </div>
                <button 
                  className="view-report-mini" 
                  onClick={() => onViewReport(session)}
                  title="View Therapist Report"
                >
                  <FileText size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
