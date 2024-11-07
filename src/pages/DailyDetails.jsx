import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { Activity, TrendingUp, Calendar, ArrowLeft, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
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

const TimelineSection = styled.div`
  margin-top: 2rem;
`;

const Timeline = styled.div`
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
`;

const TimeBlock = styled.div`
  height: 40px;
  background-color: ${props => (props.$active ? '#87BBA2' : 'rgba(54, 73, 88, 0.1)')};
  border-radius: 0.25rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: scaleY(1.1);
  }
`;

export default function DailyDetails() {
  const navigate = useNavigate();
  const metrics = [
    { icon: <Activity size={24} />, label: 'Steps', value: 8432, max: 10000, color: '#C9E4CA' },
    { icon: <TrendingUp size={24} />, label: 'Calories', value: 420, max: 600, color: '#87BBA2' },
    { icon: <Calendar size={24} />, label: 'Active Minutes', value: 45, max: 60, color: '#364958' },
    { icon: <Heart size={24} />, label: 'Avg Heart Rate', value: 72, max: 100, color: '#09949B' },
    { icon: <Clock size={24} />, label: 'Sleep Hours', value: 7, max: 8, color: '#3B6064' }
  ];

  // Simulate active hours (just for demonstration)
  const activeHours = Array(24)
    .fill(false)
    .map((_, i) => Math.random() > 0.5 && i >= 6 && i <= 22);

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
            <Title>Daily Activity Details</Title>
          </Header>

          <MetricsGrid>
            {metrics.map((metric, index) => (
              <MetricCard key={index}>
                {metric.icon}
                <ProgressBar value={metric.value} max={metric.max} color={metric.color} />
                <div>{metric.label}</div>
                <div>{metric.value.toLocaleString()} / {metric.max.toLocaleString()}</div>
              </MetricCard>
            ))}
          </MetricsGrid>

          <TimelineSection>
            <h2 className="text-xl font-bold text-[#364958] mb-4">Activity Timeline</h2>
            <Timeline>
              {activeHours.map((active, index) => (
                <TimeBlock key={index} $active={active} title={`${index}:00 - ${index + 1}:00`} />
              ))}
            </Timeline>
          </TimelineSection>
        </div>
      </div>
    </div>
  );
}
