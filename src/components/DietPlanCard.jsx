import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function DietPlanCard({ title, description, calories, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white/90 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-[#364958] mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{calories} calories/day</span>
        <ArrowRight className="w-5 h-5 text-[#55828B]" />
      </div>
    </div>
  );
}