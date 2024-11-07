import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { Activity, TrendingUp, Calendar, ArrowLeft, Award, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';

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

export default function WeeklyDetails() {
  const navigate = useNavigate();
  const metrics = [
    { icon: <Activity size={24} />, label: 'Weekly Steps', value: 52145, max: 70000, color: '#C9E4CA' },
    { icon: <TrendingUp size={24} />, label: 'Daily Average', value: 7449, max: 10000, color: '#87BBA2' },
    { icon: <Calendar size={24} />, label: 'Active Days', value: 5, max: 7, color: '#364958' },
    { icon: <Award size={24} />, label: 'Achievements', value: 3, max: 5, color: '#55828B' },
    { icon: <Target size={24} />, label: 'Goals Met', value: 4, max: 5, color: '#3B6064' }
  ];

  const weekDays = [
    { day: 'Mon', steps: 8432, isToday: false },
    { day: 'Tue', steps: 7654, isToday: false },
    { day: 'Wed', steps: 9876, isToday: false },
    { day: 'Thu', steps: 6543, isToday: true },
    { day: 'Fri', steps: 8765, isToday: false },
    { day: 'Sat', steps: 5432, isToday: false },
    { day: 'Sun', steps: 7654, isToday: false }
  ];

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
                <div>{metric.value.toLocaleString()} / {metric.max.toLocaleString()}</div>
              </MetricCard>
            ))}
          </MetricsGrid>

          <h2 className="text-xl font-bold text-[#364958] mb-4">Daily Breakdown</h2>
          <WeekGrid>
            {weekDays.map((day, index) => (
              <DayCard key={index} $isToday={day.isToday}>
                <div className="font-bold mb-2">{day.day}</div>
                <div className="text-sm">{day.steps.toLocaleString()} steps</div>
              </DayCard>
            ))}
          </WeekGrid>
        </div>
      </div>
    </div>
  );
}
