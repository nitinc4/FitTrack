import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function DietPlanCard({ title, description, calories, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:scale-[1.02]"
    >
      <h3 className="text-xl font-semibold text-[#364958] mb-2">{title}</h3>
      <p className="text-[#364958]/90 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-[#364958]/80">{calories} calories/day</span>
        <ArrowRight className="w-5 h-5 text-[#364958]" />
      </div>
    </div>
  );
}
