import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import WorkoutCard from '../components/WorkoutCard';
import WorkoutForm from '../components/WorkoutForm';
import { Plus } from 'lucide-react';

export default function WorkoutPlan() {
  const [workouts, setWorkouts] = useState([
    {
      id: '1',
      day: "Monday - Chest & Triceps",
      exercises: [
        { id: '1-1', name: "Bench Press", sets: "3x10" },
        { id: '1-2', name: "Tricep Extensions", sets: "3x12" },
        { id: '1-3', name: "Push-ups", sets: "3x15" }
      ]
    },
    {
      id: '2',
      day: "Wednesday - Back & Biceps",
      exercises: [
        { id: '2-1', name: "Pull-ups", sets: "3x8" },
        { id: '2-2', name: "Barbell Rows", sets: "3x10" },
        { id: '2-3', name: "Bicep Curls", sets: "3x12" }
      ]
    },
    {
      id: '3',
      day: "Friday - Legs & Shoulders",
      exercises: [
        { id: '3-1', name: "Squats", sets: "3x10" },
        { id: '3-2', name: "Shoulder Press", sets: "3x12" },
        { id: '3-3', name: "Lunges", sets: "3x15 each leg" }
      ]
    }
  ]);

  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  const handleToggleExercise = (workoutId, exerciseId) => {
    const key = `${workoutId}-${exerciseId}`;
    const newCompleted = new Set(completedExercises);
    if (newCompleted.has(key)) {
      newCompleted.delete(key);
    } else {
      newCompleted.add(key);
    }
    setCompletedExercises(newCompleted);
  };

  const isExerciseCompleted = (workoutId, exerciseId) => {
    return completedExercises.has(`${workoutId}-${exerciseId}`);
  };

  const handleSaveWorkout = (workoutData) => {
    if (editingWorkout) {
      setWorkouts(prev => 
        prev.map(w => w.id === workoutData.id ? workoutData : w)
      );
    } else {
      setWorkouts(prev => [...prev, workoutData]);
    }
    setShowForm(false);
    setEditingWorkout(null);
  };

  const handleEditWorkout = (workout) => {
    setEditingWorkout(workout);
    setShowForm(true);
  };

  const handleDeleteWorkout = (workoutId) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      setWorkouts(prev => prev.filter(w => w.id !== workoutId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#364958]">Workout Schedule</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Workout
            </button>
          </div>

          <div className="grid gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                onToggleExercise={handleToggleExercise}
                isExerciseCompleted={isExerciseCompleted}
                onEditWorkout={handleEditWorkout}
                onDeleteWorkout={handleDeleteWorkout}
              />
            ))}
          </div>
        </div>
      </div>

      {showForm && (
        <WorkoutForm
          workout={editingWorkout}
          onSave={handleSaveWorkout}
          onClose={() => {
            setShowForm(false);
            setEditingWorkout(null);
          }}
        />
      )}
    </div>
  );
}