import React from 'react';
import Navbar from '../components/Navbar';

export default function ActivityMonitor() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-4">Activity Tracking</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Today's Activity</h3>
              <p>Steps: 8,432</p>
              <p>Calories Burned: 420</p>
              <p>Active Minutes: 45</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Weekly Summary</h3>
              <p>Total Steps: 52,145</p>
              <p>Average Daily Steps: 7,449</p>
              <p>Active Days: 5/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}