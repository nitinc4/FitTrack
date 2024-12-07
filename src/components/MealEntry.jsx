import React from 'react';
import { Trash2 } from 'lucide-react';

export default function MealEntry({ entry, onDelete }) {
  return (
    <div className="bg-gradient-to-br from-white to-[#F8FAFC] rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-[#E2E8F0]">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white bg-gradient-to-r from-[#55828B] to-[#3B6064] px-3 py-1 rounded-full">
              {entry.mealType}
            </span>
            <span className="text-lg font-semibold text-[#364958]">
              {entry.description}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-2 bg-white/50 p-2 rounded-md">
            <span className="font-medium text-[#55828B]">{entry.calories} kcal</span> | 
            <span className="ml-2">Protein: {entry.nutritionInfo.protein_g}g</span> | 
            <span className="ml-2">Carbs: {entry.nutritionInfo.carbohydrates_total_g}g</span> | 
            <span className="ml-2">Fat: {entry.nutritionInfo.fat_total_g}g</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(entry._id)}
          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-all duration-200"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}