import React, { useState, useEffect } from 'react';
import { Camera, PenLine, Calendar, BarChart3, Plus, Trash2, ChevronDown } from 'lucide-react';
import  Navbar  from '../components/Navbar';

export default function DietPlan() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('mealEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [calories, setCalories] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('daily');

  useEffect(() => {
    localStorage.setItem('mealEntries', JSON.stringify(entries));
  }, [entries]);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Simulate AI analysis with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you'd send the image to an AI service
      const mockCalories = Math.floor(Math.random() * 500) + 200;
      setCalories(mockCalories.toString());
      setSelectedImage(URL.createObjectURL(file));
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEntry = () => {
    if (!calories || !description) return;

    const newEntry = {
      id: Date.now().toString(),
      calories: Number(calories),
      description,
      image: selectedImage || undefined,
      timestamp: new Date().toISOString(),
    };

    setEntries(prev => [newEntry, ...prev]);
    setCalories('');
    setDescription('');
    setSelectedImage(null);
    setShowForm(false);
  };

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  const getTotalCalories = (entries) => {
    return entries.reduce((sum, entry) => sum + entry.calories, 0);
  };

  const getFilteredEntries = () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    return entries.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return viewMode === 'daily' 
        ? entryDate >= startOfDay 
        : entryDate >= startOfWeek;
    });
  };

  const filteredEntries = getFilteredEntries();
  const totalCalories = getTotalCalories(filteredEntries);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      
      <div className="container mx-auto p-6 space-y-6">
        {/* Stats Card */}
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#364958]">Calorie Tracker</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('daily')}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === 'daily'
                    ? 'bg-[#55828B] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setViewMode('weekly')}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === 'weekly'
                    ? 'bg-[#55828B] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-[#55828B] to-[#3B6064] p-6 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Total Calories</h3>
              <div className="text-3xl font-bold">{totalCalories}</div>
              <p className="text-sm opacity-80">
                {viewMode === 'daily' ? 'Today' : 'This Week'}
              </p>
            </div>
            
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 bg-[#87BBA2] hover:bg-[#55828B] text-white p-6 rounded-lg transition-colors"
            >
              <Plus size={24} />
              <span className="font-semibold">Add New Entry</span>
            </button>
          </div>
        </div>

        {/* Add Entry Form */}
        {showForm && (
          <div className="bg-white/90 rounded-lg shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Add New Entry</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter calories"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                    placeholder="What did you eat?"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer bg-[#87BBA2] text-white px-4 py-2 rounded-lg hover:bg-[#55828B] transition-colors">
                  <Camera size={20} />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {loading && <span className="text-sm text-gray-600">Analyzing image...</span>}
              </div>

              {selectedImage && (
                <div className="relative w-40 h-40">
                  <img
                    src={selectedImage}
                    alt="Food preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={addEntry}
                  className="px-4 py-2 bg-[#55828B] text-white rounded-lg hover:bg-[#3B6064]"
                >
                  Add Entry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Entries List */}
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Entries</h3>
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                {entry.image && (
                  <img
                    src={entry.image}
                    alt="Food"
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{entry.description}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">{entry.calories} cal</span>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            {filteredEntries.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No entries found for this period
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}