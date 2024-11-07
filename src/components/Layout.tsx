import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import styled from 'styled-components';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #C9E4CA, #87BBA2, #55828B);
`;

const ContentContainer = styled.div`
  padding: 2rem;
`;

const Layout = () => {
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