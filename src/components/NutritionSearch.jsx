import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { fetchNutritionInfo } from '../services/calorieApi';

export default function NutritionSearch({ onFoodSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const items = await fetchNutritionInfo(searchTerm);
      if (items && items.length > 0) {
        onFoodSelect(items[0]);
      } else {
        setError('No nutrition information found for this food');
      }
    } catch (err) {
      setError('Failed to fetch nutrition information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a food item..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#55828B]"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#55828B] text-white rounded-lg hover:bg-[#3B6064] transition-colors disabled:opacity-50"
        >
          {loading ? 'Searching...' : <Search size={20} />}
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}