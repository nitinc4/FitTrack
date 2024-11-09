import React, { useState, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import GoogleAuth from './GoogleAuth';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #C9E4CA, #87BBA2, #55828B);
`;

const ContentContainer = styled.div`
  padding: 2rem;
`;

const AuthContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    setIsAuthenticated(!!token);
  }, []);

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <Navbar />
        <AuthContainer>
          <h2 className="text-xl font-bold text-[#364958] mb-4">Sign in to continue</h2>
          <GoogleAuth />
        </AuthContainer>
      </PageContainer>
    );
  }

  // After authentication, redirect to home if on the root path
  if (location.pathname === '/') {
    return <Navigate to="/home" replace />;
  }

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <Outlet />
      </ContentContainer>
    </PageContainer>
  );
};

export default Layout;