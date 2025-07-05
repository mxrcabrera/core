import React, { useState } from 'react';
import authService from '../services/authService';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import neuralNetworkLogo from '../assets/neural-network.svg';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Google Auth Handler
  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    setError('');

    try {
      const authResponse = await authService.loginWithGoogle(credentialResponse.credential);
      authService.saveToken(authResponse.token);
      authService.saveUser(authResponse.user);
      
      window.location.href = '/dashboard';
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Error al iniciar sesión con Google');
  };

  // Hook de Google Auth
  const { signInWithGoogle } = useGoogleAuth({
    clientId: GOOGLE_CLIENT_ID,
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleError
  });

  // Login normal con email/password
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await authService.login(email, password);
      authService.saveToken(response.token);
      authService.saveUser(response.user);
      
      window.location.href = '/dashboard';
    } catch (error: unknown) {
      if (typeof error === 'string') {
        setError(error);
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error desconocido al iniciar sesión');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkedInLogin = (): void => {
    alert('LinkedIn login - próximamente');
  };

  return (
    <div className="container-full">
      <div className="container-split">
        {/* Left Side - Logo */}
        <div className="container-side">
          <div className="logo-container">
            <div className="w-48 h-48 mx-auto mb-8 flex items-center justify-center">
              <img 
                src={neuralNetworkLogo} 
                alt="Core Neural Network" 
                className="w-full h-full"
              />
            </div>
            <h1 className="logo-title">Core</h1>
            <p className="logo-subtitle">Iniciar sesión para acceder al dashboard</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="container-side">
          <div className="form-container">
            
            {/* Error Message */}
            {error && (
              <div className="alert-error">
                <p className="alert-error-text">{error}</p>
              </div>
            )}

            {/* Social Login Buttons */}
            <div className="section-spacing">
              {/* Google Button */}
              <button 
                type="button" 
                className="btn-social"
                onClick={signInWithGoogle}
                disabled={isLoading}
              >
                <svg className="btn-social-icon" viewBox="0 0 24 24">
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="btn-social-text">Continuar con Google</span>
              </button>
            </div>

            <div className="divider">
              <div className="divider-line">
                <div className="divider-border"></div>
              </div>
              <div className="divider-text">
                <span>O con tu email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="form-input-wrapper">
                  <div className="form-input-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="Email"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña</label>
                <div className="form-input-wrapper">
                  <div className="form-input-icon">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    placeholder="Contraseña"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="checkbox-wrapper">
                <div className="checkbox-group">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="checkbox-input"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember" className="checkbox-label">
                    Recordarme
                  </label>
                </div>
                <button type="button" className="btn-link-secondary">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button 
                type="submit" 
                className="btn-primary text-spacing"
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </form>

            <div className="center-text">
              <span className="text-responsive">¿No tienes una cuenta? </span>
              <button type="button" className="btn-link">
                Regístrate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;