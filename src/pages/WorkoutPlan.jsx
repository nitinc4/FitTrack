import React from 'react';
import Navbar from '../components/Navbar';

export default function WorkoutPlan() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-4">Workout Schedule</h2>
          <div className="grid gap-4">
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Monday - Chest & Triceps</h3>
              <p>Bench Press: 3x10</p>
              <p>Tricep Extensions: 3x12</p>
              <p>Push-ups: 3x15</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Wednesday - Back & Biceps</h3>
              <p>Pull-ups: 3x8</p>
              <p>Barbell Rows: 3x10</p>
              <p>Bicep Curls: 3x12</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Friday - Legs & Shoulders</h3>
              <p>Squats: 3x10</p>
              <p>Shoulder Press: 3x12</p>
              <p>Lunges: 3x15 each leg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}