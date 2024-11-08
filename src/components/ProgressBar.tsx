import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
}

const ProgressContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const ProgressSVG = styled.svg`
  transform: rotate(-90deg);
`;

const Background = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
`;

const Progress = styled.circle<{ progress: number; color?: string }>`
  fill: none;
  stroke: ${props => props.color || '#C9E4CA'};
  stroke-linecap: round;
  transition: stroke-dashoffset 0.5s ease-in-out;
`;

const ValueText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color }) => {
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min((value / max) * 100, 100);
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <ProgressContainer>
      <ProgressSVG width={size} height={size}>
        <Background
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Progress
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          progress={progress}
          color={color}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </ProgressSVG>
      <ValueText>{Math.round(progress)}%</ValueText>
    </ProgressContainer>
  );
};

export default ProgressBar;