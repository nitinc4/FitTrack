import React from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';

interface ActivityCardProps {
  title: string;
  metrics: {
    label: string;
    value: number;
    max: number;
    color?: string;
  }[];
}

const Card = styled.div`
  padding: 1rem;
  background: linear-gradient(to right, #55828B, #3B6064);
  border-radius: 0.5rem;
  color: white;
`;

const Title = styled.h3`
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 1.125rem;
`;

const ActivityCard: React.FC<ActivityCardProps> = ({ title, metrics }) => {
  return (
    <Card>
      <Title>{title}</Title>
      {metrics.map((metric, index) => (
        <ProgressBar
          key={index}
          label={metric.label}
          value={metric.value}
          max={metric.max}
          color={metric.color}
        />
      ))}
    </Card>
  );
};

export default ActivityCard;