import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import DietPlan from './pages/DietPlan';
import WorkoutPlan from './pages/WorkoutPlan';
import ActivityMonitor from './pages/ActivityMonitor';
import Community from './pages/Community';
import DailyDetails from './pages/DailyDetails';
import WeeklyDetails from './pages/WeeklyDetails';
import Layout from './components/Layout';
import BeginnerWorkouts from './pages/BeginnerWorkouts';
import IntermediateWorkouts from './pages/IntermediateWorkouts';
import AdvancedWorkouts from './pages/AdvancedWorkouts';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/diet" element={<DietPlan />} />
        <Route path="/workout" element={<WorkoutPlan />} />
        <Route path="/activity" element={<ActivityMonitor />} />
        <Route path="/Weekly" element={<WeeklyDetails />} />
        <Route path="/daily" element={<DailyDetails />} />
        <Route path="/community" element={<Community />} />
        <Route path="/workouts" element={<WorkoutPlan />} />
        <Route path="/workouts/beginner" element={<BeginnerWorkouts />} />
        <Route path="/workouts/intermediate" element={<IntermediateWorkouts />} />
        <Route path="/workouts/advanced" element={<AdvancedWorkouts />} />
        <Route path="/" element={<WorkoutPlan />} />

      </Routes>
    </Router>
  );
}