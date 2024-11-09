import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut } from 'lucide-react';

const Nav = styled.nav`
  background: linear-gradient(to right, #364958, #3B6064);
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  text-decoration: none;
  
  &:hover {
    color: #C9E4CA;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  color: inherit;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #C9E4CA;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  margin-left: 1.5rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: #C9E4CA;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('googleToken');
    navigate('/');
    window.location.reload();
  };

  return (
    <Nav>
      <Container>
        <Brand to="/home">
          <IconWrapper>
            <Activity size={24} />
          </IconWrapper>
          FitTrack
        </Brand>
        {localStorage.getItem('googleToken') && (
          <NavLinks>
            <NavLink to="/activity">Activity</NavLink>
            <NavLink to="/diet">Diet Plan</NavLink>
            <NavLink to="/workout">Workout Plan</NavLink>
            <NavLink to="/community">Community</NavLink>
            <LogoutButton onClick={handleLogout}>
              <LogOut size={20} />
              Sign Out
            </LogoutButton>
          </NavLinks>
        )}
      </Container>
    </Nav>
  );
};

export default Navbar;