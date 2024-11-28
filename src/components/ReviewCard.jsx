import React from 'react';

export default function ReviewCard({ author, rating, content, date }) {
  return (
    <div className="bg-white/90 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B] flex items-center justify-center text-white font-semibold">
            {author[0]}
          </div>
          <div>
            <h3 className="font-semibold">{author}</h3>
            <p className="text-sm text-gray-600">{date}</p>
          </div>
        </div>
        <div className="flex items-center">
          {[...Array(rating)].map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
        </div>
      </div>
      <p className="text-gray-800">{content}</p>
    </div>
  );
}