import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: linear-gradient(135deg, #55828B, #3B6064);
  padding: 1.5rem;
  border-radius: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Label = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const Value = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const IconWrapper = styled.div`
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
`;

export default function StatCard({ icon, label, value }) {
  return (
    <Card>
      <IconWrapper>{icon}</IconWrapper>
      <Value>{value}</Value>
      <Label>{label}</Label>
    </Card>
  );
}