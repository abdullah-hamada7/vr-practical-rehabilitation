import { calculateAngle } from '../utils/angles';

export default {
  id: 'bicepCurls',
  name: 'Bicep Curls',
  joints: {
    shoulder: 11,
    elbow: 13,
    wrist: 15
  },
  gauges: [
    { name: 'Elbow', points: ['shoulder', 'elbow', 'wrist'], target: 40 }
  ],
  analyze(landmarks, stage) {
    const shoulder = landmarks[11];
    const elbow = landmarks[13];
    const wrist = landmarks[15];

    if (shoulder.visibility < 0.5 || elbow.visibility < 0.5 || wrist.visibility < 0.5) {
      return { stage, feedback: { text: 'Keep arm in view', type: 'neutral' }, isGoodRep: false, viewType: 'side' };
    }

    const elbowAngle = calculateAngle(shoulder, elbow, wrist);

    // ── Strict Form Checks ──────────────────────────────────
    // 1. Elbow Tuck: Elbow should stay close to the shoulder's vertical line in side view
    const elbowDrift = Math.abs(elbow.x - shoulder.x);
    const isElbowTucked = elbowDrift < 0.15; // Strict threshold

    // 2. Shoulder Stability: Shoulder shouldn't move much vertically or horizontally
    // (We don't have historical state here, but we can check if it's too far from expected midline)
    
    let nextStage = stage;
    let feedback = { text: 'Curl your arm...', type: 'neutral' };
    let isGoodRep = false;

    if (!isElbowTucked) {
      feedback = { text: 'Form Check: Keep elbows tucked to your side', type: 'error' };
    }

    if (elbowAngle > 160) {
      // Rep completes when arm is fully extended (DOWN phase ends)
      if (stage === 'UP') {
        // ONLY count the rep if the form was correct at the point of completion
        if (isElbowTucked) {
          isGoodRep = true;
          feedback = { text: 'Excellent control. Rep counted.', type: 'good' };
        } else {
          feedback = { text: 'Rep discarded: Keep elbows tucked next time', type: 'error' };
        }
      }
      nextStage = 'DOWN';
    }

    if (elbowAngle < 50) { // Changed from 40 to be slightly more realistic for most
      if (stage === 'DOWN') {
        if (isElbowTucked) {
          feedback = { text: 'Full contraction achieved!', type: 'good' };
          nextStage = 'UP';
        } else {
          feedback = { text: 'Good depth, but keep elbow still', type: 'error' };
          // We still move to UP stage, but the rep won't count at the bottom if isElbowTucked is false
        }
      }
    }

    return { stage: nextStage, feedback, isGoodRep, viewType: 'side', angles: { elbow: elbowAngle } };
  }
};
