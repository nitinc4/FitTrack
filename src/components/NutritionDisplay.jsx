import React from 'react';

export default function NutritionDisplay({ nutritionInfo }) {
  if (!nutritionInfo) return null;

  const nutritionFields = [
    { label: 'Serving Size', value: `${nutritionInfo.serving_size_g}g` },
    { label: 'Calories', value: nutritionInfo.calories },
    { label: 'Total Fat', value: `${nutritionInfo.fat_total_g}g` },
    { label: 'Saturated Fat', value: `${nutritionInfo.fat_saturated_g}g` },
    { label: 'Protein', value: `${nutritionInfo.protein_g}g` },
    { label: 'Carbohydrates', value: `${nutritionInfo.carbohydrates_total_g}g` },
    { label: 'Fiber', value: `${nutritionInfo.fiber_g}g` },
    { label: 'Sugar', value: `${nutritionInfo.sugar_g}g` },
    { label: 'Sodium', value: `${nutritionInfo.sodium_mg}mg` },
    { label: 'Potassium', value: `${nutritionInfo.potassium_mg}mg` },
    { label: 'Cholesterol', value: `${nutritionInfo.cholesterol_mg}mg` },
  ];

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-semibold text-lg mb-3 capitalize">{nutritionInfo.name}</h4>
      <div className="grid grid-cols-2 gap-4">
        {nutritionFields.map((field) => (
          <div key={field.label} className="flex justify-between">
            <span className="text-gray-600">{field.label}:</span>
            <span className="font-medium">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}