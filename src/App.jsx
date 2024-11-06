import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import DietPlan from './pages/DietPlan';
import WorkoutPlan from './pages/WorkoutPlan';
import ActivityMonitor from './pages/ActivityMonitor';
import Community from './pages/Community';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/diet" element={<DietPlan />} />
        <Route path="/workout" element={<WorkoutPlan />} />
        <Route path="/activity" element={<ActivityMonitor />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}