import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'

const GOOGLE_CLIENT_ID = '385906984916-jse7uv1idi8cud8883av8mfvq5ktklma.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
)