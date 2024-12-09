import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { Activity, TrendingUp, Calendar, ArrowLeft, Award, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { fetchFitnessData } from '../services/googleFit';
import { formatNumber } from '../utils/formatters';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #364958;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #55828B;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #364958;
  font-weight: bold;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: linear-gradient(to right, #55828B, #3B6064);
  padding: 1.5rem;
  border-radius: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const DayCard = styled.div`
  background: ${props => (props.$isToday ? '#87BBA2' : 'rgba(54, 73, 88, 0.1)')};
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  color: ${props => (props.$isToday ? 'white' : '#364958')};
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

export default function WeeklyDetails() {
  const navigate = useNavigate();
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

  const activeDays = fitnessData?.weekly?.dailySteps?.filter(day => day.steps > 0).length || 0;
  
  const metrics = [
    { 
      icon: <Activity size={24} />, 
      label: 'Weekly Steps', 
      value: fitnessData?.weekly?.steps || 0, 
      max: 70000, 
      color: '#C9E4CA' 
    },
    { 
      icon: <TrendingUp size={24} />, 
      label: 'Daily Average', 
      value: Math.round((fitnessData?.weekly?.steps || 0) / 7), 
      max: 10000, 
      color: '#87BBA2' 
    },
    { 
      icon: <Calendar size={24} />, 
      label: 'Active Days', 
      value: (activeDays-1), 
      max: 7, 
      color: '#364958' 
    },
    { 
      icon: <Award size={24} />, 
      label: 'Weekly Goal Progress', 
      value: Math.round((fitnessData?.weekly?.steps || 0) / 700), 
      max: 100, 
      color: '#09949B' 
    }
  ];

  const weekDays = fitnessData?.weekly?.dailySteps || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E4CA] via-[#87BBA2] to-[#55828B]">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white/90 rounded-lg shadow-xl p-6">
          <Header>
            <BackButton onClick={() => navigate('/activity')}>
              <ArrowLeft size={20} />
              Back
            </BackButton>
            <Title>Weekly Activity Summary</Title>
          </Header>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <MetricsGrid>
            {metrics.map((metric, index) => (
              <MetricCard key={index}>
                {metric.icon}
                <ProgressBar
                  value={metric.value}
                  max={metric.max}
                  color={metric.color}
                />
                <div>{metric.label}</div>
                <div>{formatNumber(metric.value)} / {formatNumber(metric.max)}</div>
              </MetricCard>
            ))}
          </MetricsGrid>

          <h2 className="text-xl font-bold text-[#364958] mb-4">Daily Breakdown</h2>
          <WeekGrid>
            {weekDays.map((day, index) => (
              <DayCard key={index} $isToday={index === weekDays.length - 1}>
                <div className="font-bold mb-2">{day.date}</div>
                <div className="text-sm">{formatNumber(day.steps)} steps</div>
                <div className="text-sm">{formatNumber(day.calories)} cal</div>
                <div className="text-sm">{day.activeMinutes} min</div>
              </DayCard>
            ))}
          </WeekGrid>
        </div>
      </div>
    </div>
  );
}