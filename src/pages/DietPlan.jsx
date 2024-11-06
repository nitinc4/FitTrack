import React from 'react';
import Navbar from '../components/Navbar';

export default function DietPlan() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-4">Your Diet Plan</h2>
          <div className="grid gap-4">
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Breakfast</h3>
              <p>Oatmeal with fruits</p>
              <p>Greek yogurt</p>
              <p>Green tea</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Lunch</h3>
              <p>Grilled chicken salad</p>
              <p>Quinoa</p>
              <p>Mixed vegetables</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Dinner</h3>
              <p>Salmon</p>
              <p>Brown rice</p>
              <p>Steamed broccoli</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}