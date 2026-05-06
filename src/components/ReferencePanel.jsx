import React, { useState } from 'react';
import { Activity, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


const exerciseConfig = {
  squats: {
    videoId: '', // Placeholder: add clinical demo ID
    tips: [
      'Keep your back straight and chest up',
      'Drop your hips below your knees',
      'Keep your weight on your heels',
      'Do not let your knees cave inward'
    ]
  },
  bicepCurls: {
    videoId: '', // Placeholder: add clinical demo ID
    tips: [
      'Keep your elbows tucked into your sides',
      'Avoid swinging your upper body',
      'Control the weight on the way down',
      'Full range of motion: extend fully'
    ]
  },
  lunges: {
    videoId: '', // Placeholder: add clinical demo ID
    tips: [
      'Keep your torso upright',
      'Step far enough forward to create 90° angles',
      'Front knee should not go past toes',
      'Lower your back knee towards the floor'
    ]
  },
  heelSlides: {
    videoId: '', // Placeholder: add clinical demo ID
    tips: [
      'Keep your heel in contact with the surface',
      'Slide slowly and smoothly',
      'Push into the stretch at the end',
      'Extend fully between repetitions'
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
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

