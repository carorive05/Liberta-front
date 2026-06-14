import React, { useState } from 'react';
import { AuthForm } from '../components/AuthForm';

export const AuthDisplay: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] font-sans p-6">
      
      <div className="text-center mb-6 max-w-sm">
        <h1 className="text-[#149B74] text-3xl font-bold tracking-tight mb-2">liberta</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          {isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
        </h2>
        <p className="text-sm text-gray-500">
          {isLogin ? 'Inicia sesión para continuar tu viaje accesible' : 'Únete a la comunidad de turismo accesible en Costa Rica'}
        </p>
      </div>

      {/* Tarjeta donde inyectamos el componente de lógica */}
      <div className="bg-white border border-gray-100 rounded-2xl p-8 w-full max-w-md shadow-sm">
        <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>

      {/* Alternador de Vistas inferior */}
      <p className="text-sm text-gray-600 mt-6">
        {isLogin ? '¿No tienes una cuenta? ' : '¿Ya tienes una cuenta? '}
        <span 
          className="text-[#149B74] font-bold cursor-pointer hover:underline" 
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Crea una cuenta aquí' : 'Inicia sesión aquí'}
        </span>
      </p>

      {/* Banner Informativo Inferior (Solo en Login) */}
      {isLogin && (
        <div className="flex items-start bg-[#E6F6F2] border border-[#BCE5DA] text-[#0D6950] rounded-xl p-4 max-w-md mt-6">
          <span className="mr-3 mt-0.5 text-lg">ℹ️</span>
          <p className="text-xs leading-relaxed m-0">
            <strong>Primera vez en Liberta?</strong> Crea una cuenta para guardar tus actividades favoritas, crear itinerarios personalizados y descubrir experiencias accesibles en todo Costa Rica.
          </p>
        </div>
      )}
    </div>
  );
};