import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import NutritionSearch from '../components/NutritionSearch';
import NutritionDisplay from '../components/NutritionDisplay';
import ImageAnalyzer from '../components/ImageAnalyzer';
import DietPlanCard from '../components/DietPlanCard';
import CaloriesSummary from '../components/CaloriesSummary';
import MealEntry from '../components/MealEntry';
import { createDietEntry, getDailyEntries, deleteDietEntry } from '../services/dietService';

// Define DIET_PLANS here
const DIET_PLANS = [
  {
    id: 'weight-loss',
    title: 'Weight Loss Plan',
    description: 'Calorie-deficit diet focused on lean proteins and vegetables',
    calories: 1500
  },
  {
    id: 'maintenance',
    title: 'Maintenance Plan',
    description: 'Balanced diet to maintain current weight',
    calories: 2000
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain Plan',
    description: 'High-protein diet with calorie surplus',
    calories: 2500
  }
];

export default function DietPlan() {
  const [showPlanSelection, setShowPlanSelection] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [mealEntries, setMealEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [consumedCalories, setConsumedCalories] = useState(0);

  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    fetchDailyEntries();
  }, []);

  const fetchDailyEntries = async () => {
    try {
      const data = await getDailyEntries(userData.googleId);
      setMealEntries(data.entries);
      setConsumedCalories(data.totalCalories);
    } catch (error) {
      console.error('Error fetching daily entries:', error);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPlanSelection(false);
  };

  const handleAddEntry = async () => {
    if (nutritionInfo) {
      try {
        const entry = {
          userId: userData.googleId,
          mealType: selectedMealType,
          calories: nutritionInfo.calories,
          description: description || nutritionInfo.name,
          nutritionInfo: {
            protein_g: nutritionInfo.protein_g,
            carbohydrates_total_g: nutritionInfo.carbohydrates_total_g,
            fat_total_g: nutritionInfo.fat_total_g,
            fiber_g: nutritionInfo.fiber_g,
            sugar_g: nutritionInfo.sugar_g
          }
        };

        await createDietEntry(entry);
        await fetchDailyEntries();
        
        setShowForm(false);
        setNutritionInfo(null);
        setDescription('');
        setSelectedMealType('breakfast');
      } catch (error) {
        console.error('Error adding meal entry:', error);
      }
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      await deleteDietEntry(entryId);
      await fetchDailyEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  if (showPlanSelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
        <Navbar />
        <div className="container mx-auto p-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
            <h2 className="text-2xl font-bold text-[#364958] mb-6">Choose Your Diet Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {DIET_PLANS.map(plan => (
                <DietPlanCard
                  key={plan.id}
                  {...plan}
                  onClick={() => handlePlanSelect(plan)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6 space-y-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#364958]">Diet Tracker</h2>
              <CaloriesSummary
                consumedCalories={consumedCalories}
                targetCalories={selectedPlan.calories}
              />
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#55828B] to-[#3B6064] text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Meal
            </button>
          </div>

          {showForm && (
            <div className="bg-gradient-to-br from-white to-[#F8FAFC] rounded-lg shadow-lg p-6 mb-6 border border-[#E2E8F0]">
              <h3 className="text-xl font-semibold text-[#364958] mb-4">Add New Meal</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <NutritionSearch onFoodSelect={setNutritionInfo} />
                  <div className="text-gray-500">- OR -</div>
                  <ImageAnalyzer onFoodDetected={setNutritionInfo} />
                </div>

                {nutritionInfo && (
                  <>
                    <NutritionDisplay nutritionInfo={nutritionInfo} />
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#364958] mb-1">
                          Meal Type
                        </label>
                        <select
                          value={selectedMealType}
                          onChange={(e) => setSelectedMealType(e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#55828B] focus:border-transparent bg-white"
                        >
                          <option value="breakfast">Breakfast</option>
                          <option value="lunch">Lunch</option>
                          <option value="dinner">Dinner</option>
                          <option value="snack">Snack</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#364958] mb-1">
                          Description (optional)
                        </label>
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Add notes about your meal..."
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#55828B] focus:border-transparent bg-white"
                        />
                      </div>
                      <div className="flex justify-end gap-4">
                        <button
                          onClick={() => setShowForm(false)}
                          className="px-4 py-2 text-[#364958] hover:bg-gray-100 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddEntry}
                          className="px-4 py-2 bg-gradient-to-r from-[#55828B] to-[#3B6064] text-white rounded-md hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
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

          <div className="space-y-4">
            {mealEntries.map((entry) => (
              <MealEntry
                key={entry._id}
                entry={entry}
                onDelete={handleDeleteEntry}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
