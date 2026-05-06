import React, { useState } from 'react';
import { Activity, ChevronDown, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const exerciseConfig = {
  squats: {
    videoId: 'aclH6jB8D_Q',
    tips: [
      'Keep your back straight and chest up',
      'Drop your hips below your knees',
      'Keep your weight on your heels',
      'Do not let your knees cave inward'
    ]
  },
  bicepCurls: {
    videoId: 'lO3p94R-2QY',
    tips: [
      'Keep your elbows tucked into your sides',
      'Avoid swinging your upper body',
      'Control the weight on the way down',
      'Full range of motion: extend fully'
    ]
  },
  lunges: {
    videoId: 'qf_8WJ7YV9o',
    tips: [
      'Keep your torso upright',
      'Step far enough forward to create 90° angles',
      'Front knee should not go past toes',
      'Lower your back knee towards the floor'
    ]
  },
  heelSlides: {
    videoId: 's2_zH44X1Wc',
    tips: [
      'Keep your heel in contact with the surface',
      'Slide slowly and smoothly',
      'Push into the stretch at the end',
      'Extend fully between repetitions'
    ]
  },
  anklePump: {
    videoId: '8X5fX9I6m5o',
    tips: [
      'Pull your toes up toward your shin as far as comfortable',
      'Then point your toes away — full plantarflexion',
      'Keep your leg still; only the foot moves',
      'Move slowly and smoothly through the full range'
      ]
  },
  clamshell: {
    videoId: 's5_3SjY49XQ',
    tips: [
      'Lie on your side with hips and knees stacked',
      'Keep your feet together throughout the movement',
      'Rotate your top knee toward the ceiling slowly',
      'Do not let your hips roll backward'
    ]
  },
  deadBug: {
    videoId: 'bcZ39mE7_h8',
    tips: [
      'Keep your lower back pressed firmly to the floor',
      'Lower opposite arm and leg together slowly',
      'Breathe out steadily during the lowering phase',
      'Return to start position with control'
    ]
  },
  singleLegStand: {
    videoId: 'p_8oI3x9m7g',
    tips: [
      'Lift one knee to hip height and hold for 2 seconds',
      'Keep your trunk upright — do not lean sideways',
      'Focus your gaze on a fixed point ahead of you',
      'Engage your core and standing hip for stability'
    ]
  },
  catCamel: {
    videoId: 'CX_6O8-S9jE',
    tips: [
      'Start on hands and knees with a neutral spine',
      'Round your spine up toward the ceiling (Cat)',
      'Arch your spine down and lift your head (Camel)',
      'Move slowly through the full range of motion'
    ]
  },
  birdDog: {
    videoId: 'F1m4kY_0l7w',
    tips: [
      'Start on hands and knees with a flat back',
      'Extend opposite arm and leg simultaneously',
      'Hold the position for at least 2 seconds',
      'Keep both shoulders level — do not rotate your trunk'
    ]
  },
  pendulum: {
    videoId: 'v7_E1e7hY50',
    tips: [
      'Lean forward at the hip and let your arm hang freely',
      'Swing your arm forward and backward like a pendulum',
      'Keep your elbow straight — do not actively curl',
      'Relax your shoulder and let gravity do the work'
    ]
  },
  bridge: {
    videoId: 't1cZ36Y80cM',
    tips: [
      'Lie on your back with knees bent and feet flat',
      'Press your feet into the floor and lift your hips',
      'Squeeze your glutes at the top of the movement',
      'Keep your knees aligned over your ankles throughout'
    ]
  },
  quadSets: {
    videoId: 'd_k6i0uG0_0',
    tips: [
      'Lie flat with your leg fully extended on the surface',
      'Tighten your thigh muscle — press the back of your knee toward the floor',
      'Hold the contraction for 5–10 seconds',
      'Relax slowly, then repeat'
    ]
  },
  straightLegRaise: {
    videoId: 'nO_L_PzUa-E',
    tips: [
      'Lie flat — bend the opposite knee for back support',
      'Tighten your thigh to lock the knee fully straight before lifting',
      'Raise your leg to roughly 45° (level with the opposite knee)',
      'Lower slowly and under control — do not drop the leg'
    ]
  }
};

export default function ReferencePanel({ exerciseId, isDashboard }) {
  const config = exerciseConfig[exerciseId] || exerciseConfig.squats;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white border border-black/[0.05] rounded-[32px] overflow-hidden shadow-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">Reference Guide</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={18} className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 pt-0 border-t border-black/[0.03]">
              <div className={`grid ${isDashboard ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1'} gap-x-6 gap-y-4 mt-6 max-w-7xl mx-auto`}>
                {config.tips.map((tip, i) => (
                  <div key={i} className="flex gap-4 items-start bg-gray-50/50 p-4 rounded-2xl">
                    <span className="text-sm font-black text-brand-primary mt-0.5">{i + 1}</span>
                    <p className="text-[15px] font-semibold text-gray-700 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>

              {config.videoId && (
                <div className="mt-8 pt-8 border-t border-black/[0.03]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                      <Zap size={14} fill="currentColor" />
                    </div>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Clinical Video Demo</h3>
                  </div>
                  <div className="relative aspect-video rounded-[24px] overflow-hidden bg-gray-100 border border-black/[0.03] group shadow-2xl shadow-black/5">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${config.videoId}?modestbranding=1&rel=0&enablejsapi=1`}
                      title="Clinical Demo"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

