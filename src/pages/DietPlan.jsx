import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function DietPlan() {
  const [image, setImage] = useState(null);
  const [calories, setCalories] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(URL.createObjectURL(file));
    analyzeImage(file); // Call a placeholder function to analyze the image
  };

  const analyzeImage = async (file) => {
    // Placeholder for actual image recognition logic
    // For now, we’ll simulate a calorie estimation result
    const estimatedCalories = 300; // Replace this with the actual result from the model/API
    setCalories(estimatedCalories);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        {/* Calorie Tracker Section */}
        <div className="bg-white/90 rounded-lg shadow-xl p-6 mt-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-4">Calorie Tracker</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
          />
          {image && <img src={image} alt="Uploaded food" className="w-40 h-40 object-cover rounded-md mb-4" />}
          {calories && <p className="text-lg font-semibold">Estimated Calories: {calories} kcal</p>}
        </div>

        
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-[#364958] mb-4">Your Diet Plan</h2>
          <div className="grid gap-4">
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Breakfast</h3>
              <p>Oatmeal with fruits</p>
              <p>Greek yogurt</p>
              <p>Green tea</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Lunch</h3>
              <p>Grilled chicken salad</p>
              <p>Quinoa</p>
              <p>Mixed vegetables</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#55828B] to-[#3B6064] rounded-lg text-white">
              <h3 className="font-semibold mb-2">Dinner</h3>
              <p>Salmon</p>
              <p>Brown rice</p>
              <p>Steamed broccoli</p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
