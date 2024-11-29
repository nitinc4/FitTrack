import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { Activity, Heart, Flame, Clock } from 'lucide-react';
import DetailHeader from '../components/DetailHeader';
import MetricCard from '../components/MetricCard';
import { fetchFitnessData } from '../services/googleFit';

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export default function DailyDetails() {
  const [fitnessData, setFitnessData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFitnessData = async () => {
      try {
        const token = localStorage.getItem('googleToken');
        if (!token) throw new Error('No authentication token found');
        
        const data = await fetchFitnessData(token);
        setFitnessData(data);
      } catch (err) {
        setError('Failed to load fitness data');
        console.error('Error loading fitness data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadFitnessData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const metrics = [
    { 
      icon: <Activity size={24} />, 
      label: 'Steps Today', 
      value: fitnessData?.daily?.steps || 0, 
      max: 10000, 
      color: '#C9E4CA' 
    },
    { 
      icon: <Heart size={24} />, 
      label: 'Average Heart Rate', 
      value: Math.round(fitnessData?.daily?.heartRate || 0), 
      max: 220, 
      color: '#FF6B6B' 
    },
    { 
      icon: <Flame size={24} />, 
      label: 'Calories Burned', 
      value: fitnessData?.daily?.calories || 0, 
      max: 2500, 
      color: '#87BBA2' 
    },
    { 
      icon: <Clock size={24} />, 
      label: 'Active Minutes', 
      value: fitnessData?.daily?.activeMinutes || 0, 
      max: 60, 
      color: '#364958' 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <DetailHeader title="Today's Activity" />

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <MetricsGrid>
            {metrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </MetricsGrid>
        </div>
      </div>
    </div>
  );
}