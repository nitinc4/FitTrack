import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-[#364958] to-[#3B6064] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white text-xl font-bold">FitTrack</Link>
        <div className="space-x-6">
          <Link to="/diet" className="text-white hover:text-[#C9E4CA]">Diet Plan</Link>
          <Link to="/workout" className="text-white hover:text-[#C9E4CA]">Workout Plan</Link>
          <Link to="/activity" className="text-white hover:text-[#C9E4CA]">Activity</Link>
          <Link to="/community" className="text-white hover:text-[#C9E4CA]">Community</Link>
        </div>
      </div>
    </nav>
  );
}