import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    localStorage.setItem('googleToken', credentialResponse.credential);
    navigate('/activity');
    window.location.reload();
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <AuthContainer>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        flow="implicit"
        ux_mode="popup"
      />
    </AuthContainer>
  );
};

export default GoogleAuth;