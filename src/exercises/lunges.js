import { calculateAngle } from '../utils/angles';

export default {
  id: 'lunges',
  name: 'Lunges',
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
      return { stage, feedback: { text: 'Keep leg in view', type: 'neutral' }, isGoodRep: false, viewType: 'side' };
    }

    const kneeAngle = calculateAngle(hip, knee, ankle);

    let nextStage = stage;
    let feedback = { text: 'Step forward...', type: 'neutral' };
    let isGoodRep = false;

    if (kneeAngle > 160) {
      if (stage === 'DOWN') {
        isGoodRep = true;
        feedback = { text: 'Good rep!', type: 'good' };
      }
      nextStage = 'UP';
    }

    if (kneeAngle < 100) {
      if (stage === 'UP') {
        feedback = { text: 'Great depth!', type: 'good' };
        nextStage = 'DOWN';
      }
    }

    return { stage: nextStage, feedback, isGoodRep, viewType: 'side', angles: { knee: kneeAngle } };
  }
};
