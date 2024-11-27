import React from 'react';
import styled from 'styled-components';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

// Function to decode JWT manually

// Function to fetch user profile using access token
const fetchUserProfile = async (accessToken) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log('User Profile:', data);
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
    console.log('Access Token:', accessToken);


    // Option 2: Fetch user profile using the access token
    const userProfile = await fetchUserProfile(accessToken);
    if (userProfile) {
      localStorage.setItem('userData', JSON.stringify(userProfile)); // Store user profile
    }

    // Save the token for API calls
    localStorage.setItem('googleToken', accessToken);

    // Navigate to the home page
    navigate('/home');
  };

  const login = useGoogleLogin({
    onSuccess: (response) => handleSuccess(response.access_token),
    onError: () => console.error('Login Failed'),
    scope: `
      email profile 
      https://www.googleapis.com/auth/fitness.activity.read 
      https://www.googleapis.com/auth/fitness.heart_rate.read 
      https://www.googleapis.com/auth/fitness.sleep.read
    `.replace(/\s+/g, ' '), // Clean up spacing in scopes
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
