import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CustomWorkoutModal from '../pages/CustomWorkoutModal';
import { Plus } from 'lucide-react';

export default function WorkoutPlan() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const difficultyLevels = [
    {
      title: "Beginner",
      description: "Perfect for those just starting their fitness journey",
      path: "/workouts/beginner",
    },
    {
      title: "Intermediate",
      description: "For those with some training experience",
      path: "/workouts/intermediate",
    },
    {
      title: "Advanced",
      description: "Challenging workouts for experienced athletes",
      path: "/workouts/advanced",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#364958]">Choose Your Fitness Level</h2>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#55828B] text-white rounded-lg hover:bg-[#446870] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Custom Plan
            </button>
          </div>
          
          <div className="flex flex-col gap-6">
            {difficultyLevels.map((level) => (
              <div
                key={level.title}
                onClick={() => navigate(level.path)}
                className="bg-[#55828B] p-6 rounded-lg shadow-md hover:shadow-lg 
                  transition-all duration-300 transform hover:-translate-y-1 cursor-pointer
                  w-full text-white hover:bg-[#446870]"
              >
                <h3 className="text-xl font-semibold mb-2">{level.title}</h3>
                <p className="text-white/90">{level.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {showModal && <CustomWorkoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
}