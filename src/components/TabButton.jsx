import React,{usestae} from 'react';

export default function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-md transition-all ${
        active ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'
      }`}
    >
      {children}
    </button>
  );
}