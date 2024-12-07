import React from 'react';
import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { saveUserProfile } from '../services/api';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const fetchUserProfile = async (accessToken) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch user profile:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = async (accessToken) => {
    try {
      const userProfile = await fetchUserProfile(accessToken);
      
      if (userProfile) {
        // Transform Google profile data to match our User model
        const userData = {
          googleId: userProfile.id,
          email: userProfile.email,
          name: userProfile.name,
          picture: userProfile.picture,
        };

        // Save user data to MongoDB
        await saveUserProfile(userData);

        // Store necessary data in localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('googleToken', accessToken);

        // Reload the page to trigger the onboarding check
        window.location.reload();
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (response) => handleSuccess(response.access_token),
    onError: () => console.error('Login Failed'),
    scope: `
      email profile 
      https://www.googleapis.com/auth/fitness.activity.read 
      https://www.googleapis.com/auth/fitness.heart_rate.read 
      https://www.googleapis.com/auth/fitness.sleep.read
    `.replace(/\s+/g, ' '),
  });

  return (
    <AuthContainer>
      <button
        onClick={() => login()}
        className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200"
      >
        <LogIn className="w-5 h-5" />
        <span>Sign in with Google</span>
      </button>
    </AuthContainer>
  );
};

export default GoogleAuth;