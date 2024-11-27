import React from 'react';
import styled from 'styled-components';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    try {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log('Decoded token:', decoded);
        localStorage.setItem('googleToken', credentialResponse.credential);
        localStorage.setItem('userProfile', JSON.stringify(decoded));
        localStorage.setItem('userData', JSON.stringify(decoded));

        navigate('/home');
    } catch (error) {
        console.error('Error decoding token:', error);
    }
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
        theme="dark"
         scope="https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read"
      />
    </AuthContainer>
  );
};



export default GoogleAuth;