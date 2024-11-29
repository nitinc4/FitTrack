import React from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';
import { formatNumber } from '../utils/formatters';

const Card = styled.div`
  background: linear-gradient(to right, #55828B, #3B6064);
  padding: 1.5rem;
  border-radius: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export default function MetricCard({ icon, label, value, max, color }) {
  return (
    <Card>
      {icon}
      <ProgressBar
        value={value}
        max={max}
        color={color}
      />
      <div>{label}</div>
      <div>{formatNumber(value)} / {formatNumber(max)}</div>
    </Card>
  );
}