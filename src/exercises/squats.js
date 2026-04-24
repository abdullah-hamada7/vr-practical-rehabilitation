import { calculateAngle } from '../utils/angles';

export default {
  id: 'squats',
  name: 'Squats',
  joints: {
    shoulder: 11,
    hip: 23,
    knee: 25,
    ankle: 27,
    rightShoulder: 12,
    rightHip: 24,
    rightKnee: 26,
    rightAnkle: 28
  },
  gauges: [
    { name: 'Knee', points: ['hip', 'knee', 'ankle'], target: 100 },
    { name: 'Back', points: ['shoulder', 'hip', 'knee'], target: 160 }
  ],
  analyze(landmarks, stage) {
    const leftHip = landmarks[23];
    const leftKnee = landmarks[25];
    const leftAnkle = landmarks[27];
    const leftShoulder = landmarks[11];
    
    const rightHip = landmarks[24];
    const rightKnee = landmarks[26];
    const rightAnkle = landmarks[28];
    const rightShoulder = landmarks[12];

    // Detect view type
    const isSideView = Math.abs(leftShoulder.x - rightShoulder.x) < 0.1;

    if (leftHip.visibility < 0.5 || rightHip.visibility < 0.5) {
      return { stage, feedback: { text: 'Visibility check: Please ensure full body is in view', type: 'neutral' }, isGoodRep: false, viewType: 'front', angles: null };
    }

    const kneeL = calculateAngle(leftHip, leftKnee, leftAnkle);
    const kneeR = calculateAngle(rightHip, rightKnee, rightAnkle);
    const backAngle = calculateAngle(leftShoulder, leftHip, leftKnee);

    // ── Multi-Joint Coordination & Weight Shift ─────────────
    const getAlignmentError = (hip, knee, ankle) => {
      const mid = (hip.x + ankle.x) / 2;
      return Math.abs(knee.x - mid);
    };
    
    // Weight Shift (Trunk Lean): Shoulder midpoint relative to Ankle midpoint
    const baseMidX = (leftAnkle.x + rightAnkle.x) / 2;
    const shoulderMidX = (leftShoulder.x + rightShoulder.x) / 2;
    const weightShift = Math.abs(shoulderMidX - baseMidX); // Trunk lean offset

    const driftL = getAlignmentError(leftHip, leftKnee, leftAnkle);
    const driftR = getAlignmentError(rightHip, rightKnee, rightAnkle);
    const maxDrift = Math.max(driftL, driftR);
    const stabilityScore = Math.max(0, 100 - (maxDrift * 500)); // 0-100 score

    let nextStage = stage;
    let feedback = { text: 'Maintaining stable posture', type: 'good' };
    let isGoodRep = false;

    // Global Form Checks
    const isBackStraight = backAngle > 145;
    const isStable = stabilityScore > 75;
    const isBalanced = weightShift < 0.08; // Allow small natural variance

    if (!isBackStraight) {
      feedback = { text: 'Posture Check: Keep your back more upright', type: 'error' };
    } else if (!isStable) {
      feedback = { text: 'Stability Check: Watch your knee alignment', type: 'error' };
    } else if (!isBalanced) {
      feedback = { text: 'Weight Shift: Center your body over your feet', type: 'error' };
    }

    // Symmetry tracking logic
    const primaryKnee = isSideView ? kneeL : Math.min(kneeL, kneeR);

    if (primaryKnee > 160) {
      if (stage === 'DOWN') {
        if (isBackStraight && isStable && isBalanced) {
          isGoodRep = true;
          feedback = { text: 'Clinical depth achieved. Rep counted.', type: 'good' };
        } else {
          feedback = { text: 'Rep discarded: Form validation failed', type: 'error' };
        }
      }
      nextStage = 'UP';
    }

    if (primaryKnee < 100) {
      if (stage === 'UP') {
        feedback = { text: 'Target depth reached!', type: 'good' };
        nextStage = 'DOWN';
      }
    }

    return { 
      stage: nextStage, 
      feedback, 
      isGoodRep, 
      viewType: isSideView ? 'side' : 'front', 
      angles: { 
        knee: kneeL, 
        kneeL, 
        kneeR, 
        back: backAngle,
        stability: stabilityScore,
        asymmetry: Math.abs(kneeL - kneeR),
        weightShift: weightShift * 100 // Convert to percentage-like offset for display
      } 
    };
  }
};
