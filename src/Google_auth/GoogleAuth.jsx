// src/components/GoogleAuth.jsx
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../config/api.js';
import './GoogleAuth.css';

const GoogleAuth = ({ buttonText = "Continue with Google", onSuccess, onError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load Google Sign-In script
    const loadGoogleScript = () => {
      if (window.google) return;

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.head.appendChild(script);
    };

    const initializeGoogleSignIn = () => {
      if (!window.google) return;

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Render the button
      window.google.accounts.id.renderButton(
        document.getElementById('google-signin-button'),
        {
          theme: 'outline',
          size: 'large',
          width: '100%',
          text: 'continue_with',
          shape: 'rectangular',
        }
      );
    };

    const handleGoogleResponse = async (response) => {
      try {
        const { data } = await apiCall('/google-auth', {
          method: 'POST',
          body: JSON.stringify({ credential: response.credential })
        });

        toast.success(data.message || 'Google authentication successful!');
        
        if (onSuccess) {
          onSuccess(data);
        } else {
          // Default navigation
          navigate(data.redirectTo || '/Books');
        }
      } catch (error) {
        console.error('Google auth error:', error);
        toast.error(error.message || 'Google authentication failed');
        
        if (onError) {
          onError(error);
        }
      }
    };

    loadGoogleScript();

    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script) {
        script.remove();
      }
    };
  }, [navigate, onSuccess, onError]);

  return (
    <div className="google-auth-container">
      <div className="google-auth-divider">
        <span>OR</span>
      </div>
      <div id="google-signin-button" className="google-signin-button">Signin with Goggle</div>
      <noscript>
        <p className="google-auth-fallback">
          JavaScript is required for Google Sign-In
        </p>
      </noscript>
    </div>
  );
};

export default GoogleAuth;