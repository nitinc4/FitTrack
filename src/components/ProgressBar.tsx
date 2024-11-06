import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  color?: string;
}

const ProgressContainer = styled.div`
  margin: 8px 0;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  font-size: 0.875rem;
  color: white;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ progress: number; color?: string }>`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: ${props => props.color || '#C9E4CA'};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, label, color }) => {
  const progress = Math.min((value / max) * 100, 100);
  
  return (
    <ProgressContainer>
      <ProgressLabel>
        <span>{label}</span>
        <span>{value} / {max}</span>
      </ProgressLabel>
      <ProgressTrack>
        <ProgressFill progress={progress} color={color} />
      </ProgressTrack>
    </ProgressContainer>
  );
};

export default ProgressBar;