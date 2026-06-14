import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación básica en Frontend para el Registro
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    const bodyData = isLogin 
      ? { email: formData.email, password: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          location: formData.location,
          requiresVisualAccessibility: "no",
          requiresHearingAccessibility: "no",
          requiresMotorAccessibility: "no"
        };

    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error en la autenticación.');

      if (isLogin) {
        localStorage.setItem('liberta_token', data.token);
        navigate('/'); 
      } else {
        alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
        
        // Mueve el formulario a modo Login de forma automática y fluida
        setIsLogin(true); 
      }
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium">
          {error}
        </div>
      )}

      {!isLogin && (
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Nombre completo</label>
          <input type="text" name="name" placeholder="Tu nombre" value={formData.name} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#149B74] transition-colors" required />
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
        <input type="email" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#149B74] transition-colors" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Contraseña</label>
        <input type="password" name="password" placeholder={isLogin ? "Ingresa tu contraseña" : "Mínimo 8 caracteres"} value={formData.password} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#149B74] transition-colors" required />
      </div>

      {/* Campos Extra (Solo visibles en Registro) */}
      {!isLogin && (
        <>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <input type="password" name="confirmPassword" placeholder="Repite tu contraseña" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#149B74] transition-colors" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">¿Dónde te encuentras?</label>
            <span className="text-xs text-gray-400 -mt-1">Esto nos ayudará a mostrarte actividades cercanas a tu ubicación</span>
            <input type="text" name="location" placeholder="San José, Puntarenas..." value={formData.location} onChange={handleChange} className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#149B74] transition-colors" required />
          </div>
        </>
      )}

      {isLogin ? (
        <div className="flex justify-between items-center text-xs mt-1">
          <label className="text-gray-600 flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="rounded text-[#149B74] focus:ring-[#149B74]" /> Recordarme
          </label>
          <span className="text-[#149B74] font-medium cursor-pointer hover:underline">¿Olvidaste tu contraseña?</span>
        </div>
      ) : (
        <p className="text-xs text-gray-500 text-center leading-relaxed mt-1">
          Acepto los <span className="text-[#149B74] cursor-pointer font-medium hover:underline">términos y condiciones</span> y la <span className="text-[#149B74] cursor-pointer font-medium hover:underline">política de privacidad</span>
        </p>
      )}

      <button type="submit" disabled={loading} className="w-full bg-[#149B74] text-white font-medium py-3 rounded-lg text-sm mt-2 hover:bg-[#0F7D5D] transition-colors disabled:opacity-50">
        {loading ? 'Procesando...' : isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
      </button>
    </form>
  );
};