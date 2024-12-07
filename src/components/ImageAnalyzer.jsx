import React, { useState } from 'react';
import { Camera, Loader } from 'lucide-react';
import { analyzeImage } from '../services/imageAnalysis';

export default function ImageAnalyzer({ onFoodDetected }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeImage(file);
      if (result) {
        onFoodDetected(result);
      }
    } catch (err) {
      setError(err.message || 'Failed to analyze image. Please try again.');
    } finally {
      setAnalyzing(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <label className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg transition-colors ${
        analyzing 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-[#87BBA2] hover:bg-[#55828B]'
      } text-white`}>
        {analyzing ? (
          <Loader className="w-5 h-5 animate-spin" />
        ) : (
          <Camera className="w-5 h-5" />
        )}
        <span>{analyzing ? 'Analyzing...' : 'Upload Food Image'}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={analyzing}
          className="hidden"
        />
      </label>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}