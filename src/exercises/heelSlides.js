import { calculateAngle } from '../utils/angles';

export default {
  id: 'heelSlides',
  name: 'Heel Slides',
  joints: {
    hip: 23,
    knee: 25,
    ankle: 27
  },
  gauges: [
    { name: 'Knee', points: ['hip', 'knee', 'ankle'], target: 90 }
  ],
  analyze(landmarks, stage) {
    const hip = landmarks[23];
    const knee = landmarks[25];
    const ankle = landmarks[27];

    if (hip.visibility < 0.5 || knee.visibility < 0.5 || ankle.visibility < 0.5) {
      return { stage, feedback: { text: 'Keep leg in view', type: 'neutral' }, isGoodRep: false, viewType: 'side', angles: null };
    }

    const kneeAngle = calculateAngle(hip, knee, ankle);

    let nextStage = stage;
    let feedback = { text: 'Maintain smooth movement', type: 'neutral' };
    let isGoodRep = false;

    // Extension (target 180)
    if (kneeAngle > 165) {
      if (stage === 'FLEX') {
        isGoodRep = true;
        feedback = { text: 'Full extension achieved', type: 'good' };
      }
      nextStage = 'EXTEND';
    }

    // Flexion (target 90)
    if (kneeAngle < 100) {
      if (stage === 'EXTEND') {
        feedback = { text: 'Optimal flexion reached', type: 'good' };
        nextStage = 'FLEX';
      }
    }

    return { stage: nextStage, feedback, isGoodRep, viewType: 'side', angles: { knee: kneeAngle } };
  }
};
