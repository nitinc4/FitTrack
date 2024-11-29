import React from 'react';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

export default function DetailHeader({ title }) {
  const navigate = useNavigate();

  return (
    <Header>
      <BackButton onClick={() => navigate('/activity')}>
        <ArrowLeft size={20} />
        Back
      </BackButton>
      <Title>{title}</Title>
    </Header>
  );
}