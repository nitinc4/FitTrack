import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

export default function CaloriesSummary({ consumedCalories, targetCalories }) {
  const remaining = Math.max(0, targetCalories - consumedCalories);

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-[#55828B] p-4 rounded-lg text-white">
        <div className="flex items-center gap-2 mb-2">
          <UtensilsCrossed className="w-5 h-5" />
          <h3 className="font-semibold">Consumed</h3>
        </div>
        <p className="text-2xl font-bold">{consumedCalories} cal</p>
      </div>
      <div className="bg-[#87BBA2] p-4 rounded-lg text-white">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold">Target</h3>
        </div>
        <p className="text-2xl font-bold">{targetCalories} cal</p>
      </div>
      <div className="bg-[#364958] p-4 rounded-lg text-white">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-semibold">Remaining</h3>
        </div>
        <p className="text-2xl font-bold">{remaining} cal</p>
      </div>
    </div>
  );
}