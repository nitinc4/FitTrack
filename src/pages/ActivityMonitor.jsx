import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ActivityCard from '../components/ActivityCard';
import { Activity, TrendingUp, Calendar, RefreshCw } from 'lucide-react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fetchFitnessData } from '../services/googleFit';

const PageContainer = styled(motion.div)`
  min-height: 100vh;
  background: linear-gradient(135deg, #C9E4CA 0%, #87BBA2 50%, #55828B 100%);
`;

const ContentWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  padding-top: 4rem;
`;

const DashboardContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #364958;
  font-weight: bold;
  margin: 0;
`;

const RefreshButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #55828B, #3B6064);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ErrorMessage = styled(motion.div)`
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.1);
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

function ActivityMonitor() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fitnessData, setFitnessData] = useState({
    daily: { steps: 0, calories: 0, activeMinutes: 0 },
    weekly: { steps: 0, calories: 0, activeMinutes: 0, activeDays: 0 }
  });
  const [error, setError] = useState(null);

  const loadFitnessData = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      const token = localStorage.getItem('googleToken');
      if (!token) throw new Error('No authentication token found');
      const data = await fetchFitnessData(token);
      setFitnessData(data);
      setLastUpdated(new Date());
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
      value: fitnessData.daily?.steps || 0,
      max: 10000,
      color: '#C9E4CA',
      icon: <Activity size={24} />
    },
    {
      label: 'Calories',
      value: fitnessData.daily?.calories || 0,
      max: 2500,
      color: '#87BBA2',
      icon: <TrendingUp size={24} />
    },
    {
      label: 'Active Minutes',
      value: fitnessData.daily?.activeMinutes || 0,
      max: 60,
      color: '#364958',
      icon: <Calendar size={24} />
    }
  ];

  const weeklyMetrics = [
    {
      label: 'Weekly Steps',
      value: fitnessData.weekly?.steps || 0,
      max: 70000,
      color: '#C9E4CA',
      icon: <Activity size={24} />
    },
    {
      label: 'Daily Average',
      value: Math.round((fitnessData.weekly?.steps || 0) / 7),
      max: 10000,
      color: '#87BBA2',
      icon: <TrendingUp size={24} />
    },
    {
      label: 'Active Days',
      value: fitnessData.weekly?.activeDays || 0,
      max: 7,
      color: '#364958',
      icon: <Calendar size={24} />
    }
  ];

  return (
    <PageContainer
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Navbar />
      <ContentWrapper>
        <DashboardContainer variants={itemVariants}>
          <Header>
            <Title>Activity Dashboard</Title>
            <RefreshButton
              onClick={loadFitnessData}
              disabled={isRefreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw 
                size={20} 
                className={isRefreshing ? 'animate-spin' : ''} 
              />
              {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
            </RefreshButton>
          </Header>

          {error && (
            <ErrorMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {error}
            </ErrorMessage>
          )}

          <GridContainer variants={containerVariants}>
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
          </GridContainer>
        </DashboardContainer>
      </ContentWrapper>
    </PageContainer>
  );
}

export default ActivityMonitor;