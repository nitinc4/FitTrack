import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: linear-gradient(135deg, #364958, #2D3E4F);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Title = styled.h3`
  color: #ffffff;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Content = styled.div`
  color: #ffffff;
`;

export default function DashboardCard({ title, children }) {
  return (
    <Card>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Card>
  );
}