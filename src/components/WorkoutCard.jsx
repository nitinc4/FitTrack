import React from 'react';
import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';

export default function WorkoutCard({ 
  workout, 
  onToggleExercise, 
  isExerciseCompleted, 
  onEditWorkout,
  onDeleteWorkout 
}) {
  return (
    <div className="p-6 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white shadow-lg transform transition-all hover:scale-[1.01]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-xl">{workout.day}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEditWorkout(workout)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => onDeleteWorkout(workout.id)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-red-300"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        {workout.exercises.map((exercise) => (
          <div 
            key={exercise.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => onToggleExercise(workout.id, exercise.id)}
          >
            <div className="flex items-center space-x-3">
              {isExerciseCompleted(workout.id, exercise.id) ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-300" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
              <span className={isExerciseCompleted(workout.id, exercise.id) ? 'line-through text-gray-300' : ''}>
                {exercise.name}
              </span>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              {exercise.sets}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-white/20">
        <div className="flex justify-between items-center text-sm text-white/70">
          <span>Progress</span>
          <span>
            {workout.exercises.filter(ex => isExerciseCompleted(workout.id, ex.id)).length} 
            / 
            {workout.exercises.length} completed
          </span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mt-2">
          <div 
            className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(workout.exercises.filter(ex => 
                isExerciseCompleted(workout.id, ex.id)).length / 
                workout.exercises.length) * 100}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}