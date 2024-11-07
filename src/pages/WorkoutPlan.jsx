import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { CheckCircle2, Circle } from 'lucide-react';

export default function WorkoutPlan() {
  const workouts = [
    {
      day: "Monday - Chest & Triceps",
      exercises: [
        { name: "Bench Press", sets: "3x10" },
        { name: "Tricep Extensions", sets: "3x12" },
        { name: "Push-ups", sets: "3x15" }
      ]
    },
    {
      day: "Wednesday - Back & Biceps",
      exercises: [
        { name: "Pull-ups", sets: "3x8" },
        { name: "Barbell Rows", sets: "3x10" },
        { name: "Bicep Curls", sets: "3x12" }
      ]
    },
    {
      day: "Friday - Legs & Shoulders",
      exercises: [
        { name: "Squats", sets: "3x10" },
        { name: "Shoulder Press", sets: "3x12" },
        { name: "Lunges", sets: "3x15 each leg" }
      ]
    }
  ];

  const [completedExercises, setCompletedExercises] = useState(new Set());

  const toggleExercise = (day, exercise) => {
    const key = `${day}-${exercise}`;
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    setCompletedExercises(newCompleted);
  };

  const isExerciseCompleted = (day, exercise) => {
    return completedExercises.has(`${day}-${exercise}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-6">Workout Schedule</h2>
          <div className="grid gap-6">
            {workouts.map((workout) => (
              <div 
                key={workout.day}
                className="p-6 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white shadow-lg transform transition-all hover:scale-[1.02]"
              >
                <h3 className="font-semibold text-xl mb-4">{workout.day}</h3>
                <div className="space-y-3">
                  {workout.exercises.map((exercise) => (
                    <div 
                      key={exercise.name}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => toggleExercise(workout.day, exercise.name)}
                    >
                      <div className="flex items-center space-x-3">
                        {isExerciseCompleted(workout.day, exercise.name) ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-300" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                        <span className={`${isExerciseCompleted(workout.day, exercise.name) ? 'line-through text-gray-300' : ''}`}>
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
                      {workout.exercises.filter(ex => isExerciseCompleted(workout.day, ex.name)).length} 
                      / 
                      {workout.exercises.length} completed
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                    <div 
                      className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(workout.exercises.filter(ex => 
                          isExerciseCompleted(workout.day, ex.name)).length / 
                          workout.exercises.length) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}