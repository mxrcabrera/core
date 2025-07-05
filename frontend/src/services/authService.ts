import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:44351';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

// Función para decodificar JWT sin verificación (solo para obtener info)
const decodeJWTPayload = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

const authService = {
  // Login normal con email/password
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/Auth/login`, {
        email,
        password
      } as LoginRequest);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Error al iniciar sesión';
    }
  },

  // Google Auth - recibe el credential token de Google
  loginWithGoogle: async (googleCredential: string): Promise<AuthResponse> => {
    try {
      // Decodificar el token de Google para obtener info del usuario
      const googleUser = decodeJWTPayload(googleCredential);
      
      if (!googleUser) {
        throw new Error('Token de Google inválido');
      }

      // Enviar al backend para procesar
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/Auth/google`, {
        credential: googleCredential,
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture
      });
      
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Error al iniciar sesión con Google';
    }
  },

  // Register normal
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/Auth/register`, userData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Error al registrarse';
    }
  },

  // LinkedIn Auth
  loginWithLinkedIn: async (linkedinCode: string): Promise<AuthResponse> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/api/Auth/linkedin`, {
        code: linkedinCode
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || 'Error al iniciar sesión con LinkedIn';
    }
  },

  // Local storage management
  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  saveToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  saveUser: (user: any): void => {
    localStorage.setItem('user', JSON.stringify(user));
  },

  getUser: (): any | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;