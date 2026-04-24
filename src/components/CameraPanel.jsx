import React from 'react';
import { Upload } from 'lucide-react';

export default function CameraPanel({
  videoRef,
  canvasRef,
  videoSource,
  onStartCamera,
  onFileUpload,
  onLoadedMetadata,
  onPlay,
  feedback,
  reps,
  romScore,
  stabilityScore,
  targetReps = 10,
}) {
  const progressPct = Math.min(100, (reps / targetReps) * 100);

  return (
    <div className="panel">
      <div className="panel-title">
        <span>{videoSource === 'camera' ? 'Clinical View' : 'Video Analysis'}</span>
        <div className="source-controls">
          <button onClick={onStartCamera} className={`source-btn ${videoSource === 'camera' ? 'active' : ''}`}>
            Camera
          </button>
          <label className={`source-btn ${videoSource === 'file' ? 'active' : ''}`}>
            <Upload size={14} /> File
            <input type="file" accept="video/*" style={{ display: 'none' }} onChange={onFileUpload} />
          </label>
        </div>
      </div>

      {/* Clean canvas — no overlay */}
      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline muted onLoadedMetadata={onLoadedMetadata} onPlay={onPlay} />
        <canvas ref={canvasRef} className="output-canvas" />
        <div className={`feedback-banner feedback-${feedback.type}`}>{feedback.text}</div>
      </div>

      {/* Metrics bar below canvas */}
      <div className="session-metrics">
        <div className="metric-cell">
          <span className="metric-value">{reps}</span>
          <span className="metric-label">Reps</span>
        </div>
        <div className="metric-divider" />
        <div className="metric-cell">
          <span className={`metric-value ${romScore !== null ? (romScore >= 88 ? 'rom-optimal' : romScore >= 65 ? 'rom-mild' : romScore >= 40 ? 'rom-moderate' : 'rom-severe') : ''}`}>
            {romScore !== null ? `${romScore}%` : '—'}
          </span>
          <span className="metric-label">ROM Score</span>
        </div>
        <div className="metric-divider" />
        <div className="metric-cell">
          <span className={`metric-value ${stabilityScore !== null && stabilityScore < 70 ? 'rom-severe' : ''}`}>
            {stabilityScore !== null ? `${Math.round(stabilityScore)}%` : '—'}
          </span>
          <span className="metric-label">Stability</span>
        </div>
        <div className="metric-divider" />
        <div className="metric-cell">
          <span className={`metric-value ${progressPct >= 100 ? 'rom-optimal' : ''}`}>
            {Math.round(progressPct)}%
          </span>
          <span className="metric-label">Complete</span>
        </div>
      </div>

      {/* Full-width progress track */}
      <div className="session-progress-bar">
        <div className="session-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
    </div>
  );
}
