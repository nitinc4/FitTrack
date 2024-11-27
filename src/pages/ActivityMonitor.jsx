import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ActivityCard from '../components/ActivityCard';
import { Activity, TrendingUp, Calendar, RefreshCw } from 'lucide-react';
import styled from 'styled-components';
import { fetchFitnessData } from '../services/googleFit';

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #364958;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #55828B;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export default function ActivityMonitor() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fitnessData, setFitnessData] = useState({
    daily: { steps: 0, calories: 0, activeMinutes: 0 },
    weekly: { steps: 0, calories: 0, activeMinutes: 0 }
  });
  const [error, setError] = useState(null);

  const loadFitnessData = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      const token = localStorage.getItem('googleToken');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const data = await fetchFitnessData(token);
      setFitnessData(data);
      setLastUpdated(new Date());
      console.log(data)
    } catch (err) {
      setError('Failed to load fitness data. Please ensure you have granted the necessary permissions.');
      console.error('Error loading fitness data:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadFitnessData();
  }, []);

  const dailyMetrics = [
    {
      label: 'Steps',
      value: fitnessData.daily.steps,
      max: 10000,
      color: '#C9E4CA',
      icon: <Activity size={18} />
    },
    {
      label: 'Calories',
      value: fitnessData.daily.calories,
      max: 600,
      color: '#87BBA2',
      icon: <TrendingUp size={18} />
    },
    {
      label: 'Active Minutes',
      value: fitnessData.daily.activeMinutes,
      max: 60,
      color: '#364958',
      icon: <Calendar size={18} />
    }
  ];

  const weeklyMetrics = [
    {
      label: 'Weekly Steps',
      value: fitnessData.weekly.steps,
      max: 70000,
      color: '#C9E4CA',
      icon: <Activity size={18} />
    },
    {
      label: 'Daily Average',
      value: Math.round(fitnessData.weekly.steps / 7),
      max: 10000,
      color: '#87BBA2',
      icon: <TrendingUp size={18} />
    },
    {
      label: 'Active Days',
      value: fitnessData.weekly.dailySteps?.filter(day => day.steps > 0).length || 0,
      max: 7,
      color: '#364958',
      icon: <Calendar size={18} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <HeaderSection>
            <h2 className="text-2xl font-bold text-[#364958]">
              <IconWrapper>
                <Activity size={24} />
              </IconWrapper>
              Activity Tracking
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
              <RefreshButton onClick={loadFitnessData} disabled={isRefreshing}>
                <RefreshCw 
                  size={18} 
                  className={isRefreshing ? 'animate-spin' : ''} 
                />
                Refresh
              </RefreshButton>
            </div>
          </HeaderSection>

          {error && <ErrorMessage>{error}</ErrorMessage>}
          {}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActivityCard 
              title="Today's Activity" 
              metrics={dailyMetrics}
              linkTo="/daily" 
            />
            <ActivityCard 
              title="Weekly Summary" 
              metrics={weeklyMetrics}
              linkTo="/weekly" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}