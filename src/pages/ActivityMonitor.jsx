import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ActivityCard from '../components/ActivityCard';
import { Activity, TrendingUp, Calendar, RefreshCw } from 'lucide-react';
import styled from 'styled-components';

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

export default function ActivityMonitor() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dailyMetrics = [
    {
      label: 'Steps',
      value: 8432,
      max: 10000,
      color: '#C9E4CA',
      icon: <Activity size={18} />
    },
    {
      label: 'Calories',
      value: 420,
      max: 600,
      color: '#87BBA2',
      icon: <TrendingUp size={18} />
    },
    {
      label: 'Active Minutes',
      value: 45,
      max: 60,
      color: '#364958',
      icon: <Calendar size={18} />
    }
  ];

  const weeklyMetrics = [
    {
      label: 'Weekly Steps',
      value: 52145,
      max: 70000,
      color: '#C9E4CA',
      icon: <Activity size={18} />
    },
    {
      label: 'Daily Average',
      value: 7449,
      max: 10000,
      color: '#87BBA2',
      icon: <TrendingUp size={18} />
    },
    {
      label: 'Active Days',
      value: 5,
      max: 7,
      color: '#364958',
      icon: <Calendar size={18} />
    }
  ];

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1000);
  };

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
              <RefreshButton onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw 
                  size={18} 
                  className={isRefreshing ? 'animate-spin' : ''} 
                />
                Refresh
              </RefreshButton>
            </div>
          </HeaderSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ActivityCard 
              title="Today's Activity" 
              metrics={dailyMetrics} 
            />
            <ActivityCard 
              title="Weekly Summary" 
              metrics={weeklyMetrics} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}