import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CustomWorkoutModal from './CustomWorkoutModal';
import { Plus, Trash2 } from 'lucide-react';
import { createWorkout, getWorkouts, deleteWorkout } from '../services/workoutService.js';

export default function WorkoutPlan() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [customWorkouts, setCustomWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const workouts = await getWorkouts(userData.googleId);
      setCustomWorkouts(workouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveWorkout = async (workoutData) => {
    try {
      const newWorkout = await createWorkout({
        ...workoutData,
        userId: userData.googleId
      });
      setCustomWorkouts([newWorkout, ...customWorkouts]);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await deleteWorkout(workoutId);
        setCustomWorkouts(customWorkouts.filter(workout => workout._id !== workoutId));
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

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
            {/* Custom Workouts */}
            {customWorkouts.map((workout) => (
              <div
                key={workout._id}
                className="bg-[#87BBA2] p-6 rounded-lg shadow-md hover:shadow-lg 
                  transition-all duration-300 w-full text-white relative"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{workout.name}</h3>
                  <button
                    onClick={() => handleDeleteWorkout(workout._id)}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {workout.exercises.map((exercise, idx) => (
                    <div key={idx} className="flex justify-between text-white/90">
                      <span>{exercise.name}</span>
                      <span>{exercise.sets} × {exercise.reps}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Difficulty Levels */}
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
      
      {showModal && <CustomWorkoutModal onClose={() => setShowModal(false)} onSave={handleSaveWorkout} />}
    </div>
  );
}