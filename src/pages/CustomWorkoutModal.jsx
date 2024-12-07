import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';

export default function CustomWorkoutModal({ onClose }) {
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: '', reps: '' }]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '' }]);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setExercises(newExercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the workout to your state management solution or backend
    const workout = {
      name: workoutName,
      exercises: exercises
    };
    console.log('Saving workout:', workout);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-semibold">Create Custom Workout</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Workout Name
            </label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-4">
            {exercises.map((exercise, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Exercise name"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="w-24">
                  <input
                    type="text"
                    placeholder="Sets"
                    value={exercise.sets}
                    onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div className="w-24">
                  <input
                    type="text"
                    placeholder="Reps"
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeExercise(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-4">
            <button
              type="button"
              onClick={addExercise}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <Plus className="w-5 h-5" />
              Add Exercise
            </button>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Workout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}