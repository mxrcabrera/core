import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = authService.getUser();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="container-full">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="logo-galaxy-mini mr-3">
                <div className="galaxy-orb">
                  <div className="galaxy-network">
                    <span className="text-black font-bold text-xs">C</span>
                  </div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-white">Core</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                {user.firstName} {user.lastName}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {user.role === 'Company' ? <CompanyKanban user={user} /> : <CandidateKanban user={user} />}
      </main>
    </div>
  );
};

// Kanban para Empresas
const CompanyKanban: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="logo-galaxy mx-auto">
          <div className="galaxy-orb">
            <div className="galaxy-network">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white">Bienvenido, {user.firstName}</h2>
        <p className="text-gray-400">Gestiona tus procesos de reclutamiento</p>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {/* Columna 1: Por hacer */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <h3 className="kanban-column-title">Por hacer</h3>
            <span className="kanban-column-count bg-gray-700 text-gray-300">2</span>
          </div>
          
          <div className="kanban-card kanban-card-priority-high">
            <h4 className="text-white font-semibold mb-2">Publicar oferta Senior Developer</h4>
            <p className="text-gray-400 text-sm mb-3">Necesitamos completar la descripción del puesto</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-red-400 font-medium">Alta prioridad</span>
              <button className="btn-galaxy text-xs py-1 px-2">Continuar</button>
            </div>
          </div>

          <div className="kanban-card kanban-card-priority-medium">
            <h4 className="text-white font-semibold mb-2">Configurar perfil de empresa</h4>
            <p className="text-gray-400 text-sm mb-3">Completar información y verificaciones</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-yellow-400 font-medium">Media prioridad</span>
              <button className="btn-galaxy text-xs py-1 px-2">Empezar</button>
            </div>
          </div>
        </div>

        {/* Columna 2: En progreso */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <h3 className="kanban-column-title">En progreso</h3>
            <span className="kanban-column-count bg-purple-700 text-purple-200">1</span>
          </div>

          <div className="kanban-card border-purple-500">
            <h4 className="text-white font-semibold mb-2">Proceso Junior Frontend</h4>
            <p className="text-gray-400 text-sm mb-3">Revisando 5 candidatos verificados</p>
            <div className="space-y-2 mb-3">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
              <span className="text-xs text-gray-400">3 de 5 candidatos revisados</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-400 font-medium">En revisión</span>
              <button className="btn-galaxy text-xs py-1 px-2">Ver candidatos</button>
            </div>
          </div>
        </div>

        {/* Columna 3: Completado */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <h3 className="kanban-column-title">Completado</h3>
            <span className="kanban-column-count bg-green-700 text-green-200">0</span>
          </div>

          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Pronto aparecerán aquí</p>
            <p className="text-gray-500 text-xs">tus procesos completados</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Kanban para Candidatos
const CandidateKanban: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <div className="logo-galaxy mx-auto">
          <div className="galaxy-orb">
            <div className="galaxy-network">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white">Hola, {user.firstName}</h2>
        <p className="text-gray-400">Tu progreso profesional</p>
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {/* Columna 1: Perfil */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <h3 className="kanban-column-title">Mi Perfil</h3>
            <span className="kanban-column-count bg-yellow-700 text-yellow-200">2</span>
          </div>
          
          <div className="kanban-card kanban-card-priority-high">
            <h4 className="text-white font-semibold mb-2">Completar experiencia laboral</h4>
            <p className="text-gray-400 text-sm mb-3">Agrega tu historial profesional</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-red-400 font-medium">Requerido</span>
              <button className="btn-galaxy text-xs py-1 px-2">Completar</button>
            </div>
          </div>

          <div className="kanban-card kanban-card-priority-medium">
            <h4 className="text-white font-semibold mb-2">Agregar skills técnicos</h4>
            <p className="text-gray-400 text-sm mb-3">Valida tus habilidades</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-yellow-400 font-medium">Recomendado</span>
              <button className="btn-galaxy text-xs py-1 px-2">Empezar</button>
            </div>
          </div>
        </div>

        {/* Columna 2: Aplicaciones */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <h3 className="kanban-column-title">Mis Aplicaciones</h3>
            <span className="kanban-column-count bg-purple-700 text-purple-200">0</span>
          </div>

          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">No tienes aplicaciones aún</p>
            <button className="btn-galaxy text-xs py-1 px-3 mt-2">Buscar ofertas</button>
          </div>
        </div>

        {/* Columna 3: Oportunidades */}
        <div className="kanban-column">
          <div className="kanban-column-header">
            <h3 className="kanban-column-title">Recomendaciones</h3>
            <span className="kanban-column-count bg-green-700 text-green-200">1</span>
          </div>

          <div className="kanban-card border-green-500">
            <h4 className="text-white font-semibold mb-2">Frontend Developer Jr.</h4>
            <p className="text-gray-400 text-sm mb-3">90% de compatibilidad con tu perfil</p>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">React, JavaScript, CSS</span>
                <span className="text-green-400 font-medium">Remoto</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-400 font-medium">Recomendado</span>
              <button className="btn-galaxy text-xs py-1 px-2">Ver oferta</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;