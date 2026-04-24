import React from 'react';
import { ROM_CONFIG, getDiagnosis } from '../utils/romConfig';

export default function TherapistPanel({ exerciseId, repROMScores = [], latestROM = null, latestAngle = null }) {
  const config = ROM_CONFIG[exerciseId];
  const hasData = repROMScores.length > 0;

  const avgROM = hasData
    ? Math.round(repROMScores.reduce((a, b) => a + b, 0) / repROMScores.length)
    : null;

  const diagnosis = getDiagnosis(exerciseId, avgROM);

  const trend = repROMScores.length >= 3
    ? repROMScores[repROMScores.length - 1] - repROMScores[0]
    : null;

  const statusColor = { optimal: 'var(--brand-accent)', mild: '#f59e0b', moderate: '#f97316', severe: 'var(--status-error)' };

  return (
    <div className="panel">
      <div className="panel-title">
        <span>Therapist Assessment</span>
      </div>

      {!hasData ? (
        <div className="therapist-empty">
          <p className="therapist-hint">Begin exercise — clinical analysis generates after each completed repetition.</p>
        </div>
      ) : (
        <>
          {/* ROM Bar */}
          <div className="rom-section">
            <div className="rom-header-row">
              <span className="rom-joint-label">{config?.label}</span>
              <span className="rom-normal">Target: {config?.normalRange}</span>
            </div>
            <div className="rom-bar-track">
              <div
                className="rom-bar-fill"
                style={{
                  width: `${avgROM ?? 0}%`,
                  background: diagnosis ? statusColor[diagnosis.status] : 'var(--brand-primary)'
                }}
              />
            </div>
            <div className="rom-stats-row">
              <div className="rom-stat">
                <span className="rom-stat-val" style={{ color: diagnosis ? statusColor[diagnosis.status] : 'inherit' }}>
                  {avgROM}%
                </span>
                <span className="rom-stat-key">Session Avg</span>
              </div>
              <div className="rom-stat">
                <span className="rom-stat-val">{latestROM ?? '—'}%</span>
                <span className="rom-stat-key">Last Rep</span>
              </div>
              {latestAngle != null && (
                <div className="rom-stat">
                  <span className="rom-stat-val">{Math.round(latestAngle)}°</span>
                  <span className="rom-stat-key">Peak Angle</span>
                </div>
              )}
            </div>

            {trend !== null && (
              <div className={`rom-trend ${trend > 5 ? 'trend-up' : trend < -5 ? 'trend-down' : 'trend-flat'}`}>
                {trend > 5 ? '↑ ROM improving' : trend < -5 ? '↓ ROM declining — consider rest' : '→ ROM stable'}
              </div>
            )}
          </div>

          {/* Diagnosis */}
          {diagnosis && (
            <div className="diagnosis-block" style={{ borderColor: statusColor[diagnosis.status] }}>
              <div className="diagnosis-status" style={{ color: statusColor[diagnosis.status] }}>
                {diagnosis.label}
              </div>
              <p className="diagnosis-advice">{diagnosis.advice}</p>
            </div>
          )}

          {/* Per-rep ROM dots */}
          <div className="rep-dots-row">
            <span className="rep-dots-label">Rep ROM</span>
            <div className="rep-dots">
              {repROMScores.map((score, i) => (
                <div
                  key={i}
                  className="rep-dot"
                  title={`Rep ${i + 1}: ${score}% ROM`}
                  style={{
                    background: score >= 88 ? 'var(--brand-accent)'
                      : score >= 65 ? '#f59e0b'
                      : score >= 40 ? '#f97316'
                      : 'var(--status-error)'
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
