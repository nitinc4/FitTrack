import React, { useState, useEffect } from 'react';
import { Plus, Camera } from 'lucide-react';
import Navbar from '../components/Navbar';
import NutritionSearch from '../components/NutritionSearch';
import NutritionDisplay from '../components/NutritionDisplay';
import ImageAnalyzer from '../components/ImageAnalyzer';
import DietPlanCard from '../components/DietPlanCard';
import CaloriesSummary from '../components/CaloriesSummary';
import MealEntry from '../components/MealEntry';
import { createDietEntry, getDailyEntries, deleteDietEntry } from '../services/dietService';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(135deg, #C9E4CA 0%, #87BBA2 50%, #55828B 100%);
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 4rem;
`;

const DashboardContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #364958;
  font-weight: bold;
  margin: 0;
`;

const AddButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #55828B, #3B6064);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const PlanGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FormContainer = styled(motion.div)`
  background: linear-gradient(to right, #ffffff, #f8f9fa);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MealList = styled(motion.div)`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

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
    description: 'High-protein diet with calorie surplus to gain weight',
    calories: 2500
  }
];

function DietPlan() {
  const [showPlanSelection, setShowPlanSelection] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [mealEntries, setMealEntries] = useState([]);
  const [description, setDescription] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [consumedCalories, setConsumedCalories] = useState(0);

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  useEffect(() => {
    if (userData?.googleId) {
      fetchDailyEntries();
    }
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
      <PageContainer
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Navbar />
        <ContentWrapper>
          <DashboardContainer variants={itemVariants}>
            <Title className="mb-6">Choose Your Diet Plan</Title>
            <PlanGrid variants={containerVariants}>
              {DIET_PLANS.map(plan => (
                <motion.div
                  key={plan.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <DietPlanCard
                    {...plan}
                    onClick={() => handlePlanSelect(plan)}
                  />
                </motion.div>
              ))}
            </PlanGrid>
          </DashboardContainer>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Navbar />
      <ContentWrapper>
        <DashboardContainer variants={itemVariants}>
          <Header>
            <div>
              <Title>Diet Tracker</Title>
              <CaloriesSummary
                consumedCalories={consumedCalories}
                targetCalories={selectedPlan.calories}
              />
            </div>
            <AddButton
              onClick={() => setShowForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={20} />
              Add Meal
            </AddButton>
          </Header>

          {showForm && (
            <FormContainer
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="text-xl font-semibold text-[#364958] mb-4">Add New Meal</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <NutritionSearch onFoodSelect={setNutritionInfo} />
                  <div className="text-gray-500">- OR -</div>
                  <ImageAnalyzer onFoodDetected={setNutritionInfo} />
                </div>

                {nutritionInfo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <NutritionDisplay nutritionInfo={nutritionInfo} />
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#364958] mb-1">
                          Meal Type
                        </label>
                        <select
                          value={selectedMealType}
                          onChange={(e) => setSelectedMealType(e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#55828B] focus:border-transparent"
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
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#55828B] focus:border-transparent"
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
                          className="px-4 py-2 bg-gradient-to-r from-[#55828B] to-[#3B6064] text-white rounded-md hover:opacity-90 transition-all duration-200"
                        >
                          Add Entry
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </FormContainer>
          )}

          <MealList variants={containerVariants}>
            {mealEntries.map((entry) => (
              <motion.div
                key={entry._id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <MealEntry
                  entry={entry}
                  onDelete={handleDeleteEntry}
                />
              </motion.div>
            ))}
          </MealList>
        </DashboardContainer>
      </ContentWrapper>
    </PageContainer>
  );
}

export default DietPlan;