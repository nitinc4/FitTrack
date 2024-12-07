import React, { useState } from 'react';
import { Camera, Plus, Trash2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import NutritionSearch from '../components/NutritionSearch';
import NutritionDisplay from '../components/NutritionDisplay';
import ImageAnalyzer from '../components/ImageAnalyzer';

export default function DietPlan() {
  const [showForm, setShowForm] = useState(false);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [mealEntries, setMealEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');

  const handleFoodSelect = (foodInfo) => {
    setNutritionInfo(foodInfo);
  };

  const handleFoodDetected = (foodInfo) => {
    setNutritionInfo({
      name: foodInfo.name,
      calories: foodInfo.calories,
      serving_size_g: 100,
      protein_g: 0,
      fat_total_g: 0,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
      sodium_mg: 0,
      potassium_mg: 0,
      cholesterol_mg: 0,
    });
    setDescription(foodInfo.name);
  };

  const handleAddEntry = () => {
    if (nutritionInfo) {
      const newEntry = {
        id: Date.now(),
        mealType: selectedMealType,
        description: description || nutritionInfo.name,
        nutritionInfo,
        timestamp: new Date().toISOString(),
      };
      setMealEntries([...mealEntries, newEntry]);
      setShowForm(false);
      setNutritionInfo(null);
      setDescription('');
      setSelectedMealType('breakfast');
    }
  };

  const handleDeleteEntry = (id) => {
    setMealEntries(mealEntries.filter(entry => entry.id !== id));
  };

  const calculateDailyTotals = () => {
    return mealEntries.reduce((totals, entry) => ({
      calories: totals.calories + entry.nutritionInfo.calories,
      protein: totals.protein + (entry.nutritionInfo.protein_g || 0),
      carbs: totals.carbs + (entry.nutritionInfo.carbohydrates_total_g || 0),
      fat: totals.fat + (entry.nutritionInfo.fat_total_g || 0),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const dailyTotals = calculateDailyTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#364958]">Diet Tracker</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#55828B] text-white rounded-lg hover:bg-[#446870] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Meal
            </button>
          </div>

          {/* Daily Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#55828B] p-4 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Calories</h3>
              <p>{Math.round(dailyTotals.calories)} kcal</p>
            </div>
            <div className="bg-[#55828B] p-4 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Protein</h3>
              <p>{Math.round(dailyTotals.protein)}g</p>
            </div>
            <div className="bg-[#55828B] p-4 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Carbs</h3>
              <p>{Math.round(dailyTotals.carbs)}g</p>
            </div>
            <div className="bg-[#55828B] p-4 rounded-lg text-white">
              <h3 className="text-lg font-semibold mb-2">Fat</h3>
              <p>{Math.round(dailyTotals.fat)}g</p>
            </div>
          </div>

          {/* Add Meal Form */}
          {showForm && (
            <div className="bg-white/90 rounded-lg shadow-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">Add New Meal</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <NutritionSearch onFoodSelect={handleFoodSelect} />
                  <div className="text-gray-500">- OR -</div>
                  <ImageAnalyzer onFoodDetected={handleFoodDetected} />
                </div>

                {nutritionInfo && (
                  <>
                    <NutritionDisplay nutritionInfo={nutritionInfo} />
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Meal Type
                        </label>
                        <select
                          value={selectedMealType}
                          onChange={(e) => setSelectedMealType(e.target.value)}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                          <option value="snack">Snack</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description (optional)
                        </label>
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Add notes about your meal..."
                          className="w-full p-2 border rounded-md"
                        />
                      </div>
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => setShowForm(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddEntry}
                          className="px-4 py-2 bg-[#55828B] text-white rounded-md hover:bg-[#446870]"
                        >
                          Add Entry
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Meal Entries */}
          <div className="space-y-4">
            {mealEntries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500 capitalize">
                      {entry.mealType}
                    </span>
                    <span className="text-lg font-semibold">
                      {entry.description || entry.nutritionInfo.name}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {entry.nutritionInfo.calories} kcal | 
                    Protein: {entry.nutritionInfo.protein_g}g | 
                    Carbs: {entry.nutritionInfo.carbohydrates_total_g}g | 
                    Fat: {entry.nutritionInfo.fat_total_g}g
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteEntry(entry.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}