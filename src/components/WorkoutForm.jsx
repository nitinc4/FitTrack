import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

export default function WorkoutForm({ workout = null, onSave, onClose }) {
  const [formData, setFormData] = useState({
    day: '',
    exercises: [{ id: crypto.randomUUID(), name: '', sets: '' }]
  });

  useEffect(() => {
    if (workout) {
      setFormData(workout);
    }
  }, [workout]);

  const handleAddExercise = () => {
    setFormData(prev => ({
      ...prev,
      exercises: [...prev.exercises, { id: crypto.randomUUID(), name: '', sets: '' }]
    }));
  };

  const handleRemoveExercise = (id) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== id)
    }));
  };

  const handleExerciseChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      exercises: prev.exercises.map(ex => 
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: formData.id || crypto.randomUUID()
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {workout ? 'Edit Workout' : 'New Workout'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Day
            </label>
            <input
              type="text"
              value={formData.day}
              onChange={(e) => setFormData(prev => ({ ...prev, day: e.target.value }))}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., Monday - Chest & Triceps"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Exercises
            </label>
            {formData.exercises.map((exercise, index) => (
              <div key={exercise.id} className="flex gap-2">
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Exercise name"
                  required
                />
                <input
                  type="text"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(exercise.id, 'sets', e.target.value)}
                  className="w-24 p-2 border rounded-md"
                  placeholder="Sets"
                  required
                />
                {formData.exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(exercise.id)}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddExercise}
            className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Plus className="w-4 h-4" />
            Add Exercise
          </button>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {workout ? 'Save Changes' : 'Create Workout'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}