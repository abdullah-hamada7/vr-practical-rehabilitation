// All MediaPipe drawing utilities accessed lazily via window at call-time,
// never destructured at module load (would crash before MediaPipe loads).

export const drawSkeleton = (ctx, landmarks, POSE_CONNECTIONS) => {
  if (!ctx || !landmarks || !window.drawConnectors || !window.drawLandmarks) return;
  
  window.drawConnectors(ctx, landmarks, POSE_CONNECTIONS, {
    color: '#00FF00',
    lineWidth: 4
  });
  window.drawLandmarks(ctx, landmarks, {
    color: '#FF0000',
    lineWidth: 2
  });
};
