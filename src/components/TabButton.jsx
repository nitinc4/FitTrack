import React from 'react';

export default function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-md transition-all ${
        active 
          ? 'bg-[#55828B] text-white hover:bg-[#3B6064]' 
          : 'text-[#364958] hover:bg-[#C9E4CA]/20'
      }`}
    >
      {children}
    </button>
  );
}