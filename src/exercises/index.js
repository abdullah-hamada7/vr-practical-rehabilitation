import squats from './squats';
import bicepCurls from './bicepCurls';
import lunges from './lunges';
import heelSlides from './heelSlides';

export const exercises = {
  squats,
  bicepCurls,
  lunges,
  heelSlides
};

export const getExercise = (id) => exercises[id] || exercises.squats;
