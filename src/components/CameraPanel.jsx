import React from 'react';
import { Upload, PlayCircle, Video, Activity, VideoOff } from 'lucide-react';

export default function CameraPanel({
  videoRef,
  canvasRef,
  videoSource,
  onStartCamera,
  onStopCamera,
  onFileUpload,
  onLoadedMetadata,
  onPlay,
  feedback,
  reps,
  romScore,
  stabilityScore,
  targetReps = 10,
  isSessionActive,
  hasStream,
}) {
  const progressPct = Math.min(100, (reps / targetReps) * 100);

  const isReady = feedback.text === 'Ready to start';
  const isCameraStreaming = hasStream && videoSource === 'camera';

  return (
    <div className="panel">
      <div className="panel-title">
        <span>{videoSource === 'camera' ? 'Clinical View' : 'Video Analysis'}</span>

        {/* Only show source controls when session is active */}
        {isSessionActive && (
          <div className="source-controls">
            {isCameraStreaming ? (
              <button
                onClick={onStopCamera}
                className="source-btn flex items-center gap-1.5"
                style={{
                  background: '#ef4444',
                  color: 'white',
                  borderColor: 'transparent',
                }}
              >
                <VideoOff size={14} /> Stop
              </button>
            ) : (
              <button onClick={onStartCamera} className={`source-btn ${videoSource === 'camera' && !hasStream ? 'active' : ''}`}>
                Camera
              </button>
            )}
            <label className={`source-btn ${videoSource === 'file' ? 'active' : ''}`}>
              <Upload size={14} /> File
              <input type="file" accept="video/*" style={{ display: 'none' }} onChange={onFileUpload} />
            </label>
          </div>
        )}
      </div>

      <div className="video-container bg-gray-50/50 flex items-center justify-center relative">
        <video ref={videoRef} autoPlay playsInline muted onLoadedMetadata={onLoadedMetadata} onPlay={onPlay} className={`${hasStream ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />
        <canvas ref={canvasRef} className={`output-canvas ${hasStream ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />
        
        {/* State 1: No Session */}
        {!isSessionActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm z-30 transition-all duration-500">
            <div className="w-16 h-16 rounded-3xl bg-white shadow-xl shadow-black/5 flex items-center justify-center mb-6">
              <PlayCircle size={32} className="text-gray-400" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-black tracking-tight text-gray-800 mb-2">Start a Session and Let's Detect together</h3>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Awaiting Initialization</p>
          </div>
        )}

        {/* State 2: Session Active, No Stream */}
        {isSessionActive && !hasStream && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm z-30 transition-all duration-500">
            <div className="w-16 h-16 rounded-3xl bg-brand-primary/10 flex items-center justify-center mb-6">
              <Video size={32} className="text-brand-primary" strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-black tracking-tight text-gray-800 mb-2">Choose a way to detect</h3>
            <p className="text-sm font-bold text-brand-primary uppercase tracking-widest">Select Camera or File above</p>
          </div>
        )}

        {/* State 3: Stream Active, Ready to Start (Centered Modern Label) */}
        {isSessionActive && hasStream && isReady && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/10 backdrop-blur-[2px] transition-all duration-500">
            <div className="bg-white/95 backdrop-blur-xl px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border border-white/20 animate-bounce">
              <Activity className="text-brand-primary animate-pulse" size={24} strokeWidth={2.5} />
              <span className="text-base font-black tracking-wide text-gray-900 uppercase">Ready to Start</span>
            </div>
          </div>
        )}

        {/* Normal Feedback Banner (Hidden when Ready to Start) */}
        {isSessionActive && hasStream && !isReady && (
          <div className={`feedback-banner feedback-${feedback.type}`}>
            {feedback.text}
          </div>
        )}
      </div>

      {/* Full-width progress track */}
      <div className="session-progress-bar">
        <div className="session-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>

    </div>
  );
}
