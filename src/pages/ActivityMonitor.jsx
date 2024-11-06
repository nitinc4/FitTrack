import React from 'react';
import Navbar from '../components/Navbar';
import ActivityCard from '../components/ActivityCard';

export default function ActivityMonitor() {
  const dailyMetrics = [
    {
      label: 'Steps',
      value: 8432,
      max: 10000,
      color: '#C9E4CA'
    },
    {
      label: 'Calories',
      value: 420,
      max: 600,
      color: '#87BBA2'
    },
    {
      label: 'Active Minutes',
      value: 45,
      max: 60,
      color: '#364958'
    }
  ];

  const weeklyMetrics = [
    {
      label: 'Weekly Steps',
      value: 52145,
      max: 70000,
      color: '#C9E4CA'
    },
    {
      label: 'Daily Average',
      value: 7449,
      max: 10000,
      color: '#87BBA2'
    },
    {
      label: 'Active Days',
      value: 5,
      max: 7,
      color: '#364958'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-4">Activity Tracking</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActivityCard title="Today's Activity" metrics={dailyMetrics} />
            <ActivityCard title="Weekly Summary" metrics={weeklyMetrics} />
          </div>
        </div>
      </div>
    </div>
  );
}