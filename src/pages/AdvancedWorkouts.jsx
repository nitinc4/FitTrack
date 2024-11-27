import React from 'react';
import Navbar from '../components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdvancedWorkouts() {
  const navigate = useNavigate();
  
  const workouts = [
    {
      day: "Day 1 - Power",
      exercises: [
        { name: "Barbell Bench Press", sets: "4x6" },
        { name: "Clean and Press", sets: "4x5" },
        { name: "Weighted Pull-ups", sets: "4x8" },
        { name: "Deadlifts", sets: "4x5" }
      ]
    },
    {
      day: "Day 2 - Strength",
      exercises: [
        { name: "Back Squats", sets: "5x5" },
        { name: "Weighted Dips", sets: "4x8" },
        { name: "Barbell Rows", sets: "4x6" },
        { name: "Olympic Lifts", sets: "3x3" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <button
          onClick={() => navigate('/workouts')}
          className="mb-4 flex items-center gap-2 text-white hover:text-gray-200"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Levels
        </button>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-6">Advanced Workout Plan</h2>
          
          <div className="grid gap-6">
            {workouts.map((workout, index) => (
              <div key={index} className="bg-[#55828B] rounded-lg p-6 shadow-md text-white">
                <h3 className="text-xl font-semibold mb-4">{workout.day}</h3>
                <ul className="space-y-3">
                  {workout.exercises.map((exercise, idx) => (
                    <li key={idx} className="flex justify-between items-center">
                      <span>{exercise.name}</span>
                      <span className="text-white/90">{exercise.sets}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}