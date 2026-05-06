import squats from './squats';
import bicepCurls from './bicepCurls';
import lunges from './lunges';
import heelSlides from './heelSlides';
import anklePump from './anklePump';
import clamshell from './clamshell';
import singleLegStand from './singleLegStand';
import catCamel from './catCamel';
import pendulum from './pendulum';
import bridge from './bridge';
import quadSets from './quadSets';
import straightLegRaise from './straightLegRaise';

export const exercises = {
  squats,
  bicepCurls,
  lunges,
  heelSlides,
  anklePump,
  clamshell,
  singleLegStand,
  catCamel,
  pendulum,
  bridge,
  quadSets,
  straightLegRaise
};

export const getExercise = (id) => exercises[id] || exercises.squats;
