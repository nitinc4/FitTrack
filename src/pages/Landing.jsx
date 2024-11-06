import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B] flex items-center justify-center">
      <div className="bg-white/90 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-[#364958] mb-6 text-center">Welcome to FitTrack</h1>
        <button
          onClick={() => navigate('/home')}
          className="w-full bg-gradient-to-r from-[#55828B] to-[#3B6064] text-white py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}