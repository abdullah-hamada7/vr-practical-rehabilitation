import React from 'react';
import { exercises } from '../exercises';

export default function ExerciseSelector({ selectedExercise, onSelect }) {
  return (
    <div className="exercise-selector">
      <select 
        value={selectedExercise} 
        onChange={(e) => onSelect(e.target.value)}
        className="custom-select"
      >
        {Object.values(exercises).map((ex) => (
          <option key={ex.id} value={ex.id}>
            {ex.name}
          </option>
        ))}
      </select>
    </div>
  );
}
