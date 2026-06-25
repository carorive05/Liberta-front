/**
 * SUPUESTOS EXPLICÍTOS DE PRUEBA:
 * 1. La función original es un componente de React. Para aislar la lógica en Jest sin un entorno
 * de renderizado visual (DOM), se emula el comportamiento de los hooks useState mediante mocks.
 * 2. Se asume un entorno de ejecución Node.js donde 'fetch', 'localStorage' y 'alert' se interceptan globalmente.
 * 3. Se utiliza sintaxis CommonJS (require) compatible con la configuración directa de Jest.
 */

const React = require('react');

// --- SIMULACIÓN CONTROLADA DE HOOKS (MOCKS) PARA AISLAR LA LÓGICA ---
let currentErrorValue = null;
let currentLoadingValue = false;

const mockSetError = (val) => { currentErrorValue = val; };
const mockSetLoading = (val) => { currentLoadingValue = val; };

// Reemplazamos el comportamiento de React.useState antes de declarar la función
jest.spyOn(React, 'useState').mockImplementation((initialValue) => {
  if (initialValue && typeof initialValue === 'object' && 'email' in initialValue) {
    return [initialValue, jest.fn()]; // Formulario
  }
  if (initialValue === null) {
    return [currentErrorValue, mockSetError]; // Error
  }
  if (initialValue === false) {
    return [currentLoadingValue, mockSetLoading]; // Loading
  }
  return [initialValue, jest.fn()];
});

// --- CÓDIGO DE LA FUNCIÓN ADAPTADO A ENTORNO DE PRUEBA UNITARIA ---

const AuthForm = ({ isLogin, setIsLogin, mockNavigate, mockStateOverrides = {} }) => {
  const navigate = mockNavigate; 

  // Estos llamados ahora usarán nuestro mock controlado superior de Jest
  const [formData, setFormData] = React.useState(mockStateOverrides.formData || {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
  });

  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mockSetError(null); // Equivale a setError(null)

    if (!isLogin && formData.password !== formData.confirmPassword) {
      mockSetError("Las contraseñas no coinciden.");
      return;
    }

    mockSetLoading(true); // Equivale a setLoading(true)
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
        setIsLogin(true); 
      }
      
    } catch (err) {
      mockSetError(err.message);
    } finally {
      mockSetLoading(false); // Equivale a setLoading(false)
    }
  };

  return { handleSubmit, handleChange, formData, error, loading };
};


// --- CONJUNTO DE PRUEBAS UNITARIAS AUTOMATIZADAS (JEST) ---

describe('Pruebas Unitarias Automatizadas para AuthForm (QA Liberta)', () => {
  let mockNavigate;
  let mockSetIsLogin;
  let savedFetch;
  let savedLocalStorage;
  let savedAlert;

  beforeEach(() => {
    mockNavigate = jest.fn();
    mockSetIsLogin = jest.fn();
    
    currentErrorValue = null;
    currentLoadingValue = false;

    savedFetch = global.fetch;
    savedLocalStorage = global.localStorage;
    savedAlert = global.alert;

    global.fetch = jest.fn();
    global.alert = jest.fn();
    
    const store = {};
    global.localStorage = {
      setItem: jest.fn((key, value) => { store[key] = value; }),
      getItem: jest.fn((key) => store[key]),
      clear: jest.fn(() => { })
    };
  });

  afterEach(() => {
    global.fetch = savedFetch;
    global.localStorage = savedLocalStorage;
    global.alert = savedAlert;
    jest.clearAllMocks();
  });

  // CASOS DE USO PRINCIPALES (HAPPY PATH)

  test('Debería iniciar sesión correctamente, guardar token y redirigir al home (Login Happy Path)', async () => {
    const mockResponseData = { token: 'jwt_token_abc123' };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData
    });

    const mockStateOverrides = {
      formData: { email: 'test@liberta.com', password: 'password123' }
    };

    const instance = AuthForm({ isLogin: true, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    const mockEvent = { preventDefault: jest.fn() };

    await instance.handleSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/login', expect.any(Object));
    expect(global.localStorage.setItem).toHaveBeenCalledWith('liberta_token', 'jwt_token_abc123');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('Debería registrar cuenta exitosamente, alertar y cambiar estado a login (Register Happy Path)', async () => {
    const mockResponseData = { success: true };
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData
    });

    const mockStateOverrides = {
      formData: { 
        name: 'Diego', 
        email: 'diego@liberta.com', 
        password: 'securePassword123', 
        confirmPassword: 'securePassword123',
        location: 'San José'
      }
    };

    const instance = AuthForm({ isLogin: false, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    const mockEvent = { preventDefault: jest.fn() };

    await instance.handleSubmit(mockEvent);

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/auth/register', expect.objectContaining({
      body: JSON.stringify({
        name: 'Diego',
        email: 'diego@liberta.com',
        password: 'securePassword123',
        location: 'San José',
        requiresVisualAccessibility: "no",
        requiresHearingAccessibility: "no",
        requiresMotorAccessibility: "no"
      })
    }));
    expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Cuenta creada con éxito'));
    expect(mockSetIsLogin).toHaveBeenCalledWith(true);
  });

  // CASOS LÍMITE (EDGE CASES)

  test('Debería permitir contraseñas con caracteres especiales o longitudes extremas si coinciden en registro', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    const mockStateOverrides = {
      formData: { 
        name: 'A', 
        email: 'a@a.com', 
        password: 'P@$$w0rd_Extremadamente_Larga_Y_Compleja_123!', 
        confirmPassword: 'P@$$w0rd_Extremadamente_Larga_Y_Compleja_123!',
        location: 'X'
      }
    };

    const instance = AuthForm({ isLogin: false, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    await instance.handleSubmit({ preventDefault: jest.fn() });

    expect(global.fetch).toHaveBeenCalled();
  });

  test('Debería manejar respuestas del servidor que tengan estado OK pero el JSON esté vacío', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    const mockStateOverrides = {
      formData: { email: 'empty@test.com', password: '123' }
    };

    const instance = AuthForm({ isLogin: true, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    await instance.handleSubmit({ preventDefault: jest.fn() });

    expect(global.localStorage.setItem).toHaveBeenCalledWith('liberta_token', undefined);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  // ENTRADAS INVÁLIDAS O INESPERADAS

  test('Debería detener el flujo y setear error si las contraseñas no coinciden en el Registro', async () => {
    const mockStateOverrides = {
      formData: { 
        email: 'diego@liberta.com', 
        password: 'password123', 
        confirmPassword: 'password456' 
      }
    };

    const instance = AuthForm({ isLogin: false, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    const mockEvent = { preventDefault: jest.fn() };

    await instance.handleSubmit(mockEvent);

    expect(global.fetch).not.toHaveBeenCalled();
    expect(currentErrorValue).toBe("Las contraseñas no coinciden.");
  });

  test('Debería enviar strings vacíos al backend si los campos obligatorios no se rellenan (falla que la función no supera en Backend)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    });

    const mockStateOverrides = {
      formData: { name: '', email: '', password: '', confirmPassword: '', location: '' }
    };

    const instance = AuthForm({ isLogin: false, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    await instance.handleSubmit({ preventDefault: jest.fn() });

    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
      body: expect.stringContaining('"name":""')
    }));
  });

  // MANEJO DE ERRORES (EXCEPTIONS / REJECTS)

  test('Debería capturar el error cuando el servidor responde con un estado no-ok (400/500) y setear mensaje devuelto', async () => {
    const errorMessage = "El correo electrónico ya se encuentra registrado.";
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: errorMessage })
    });

    const mockStateOverrides = {
      formData: { email: 'error@liberta.com', password: '123' }
    };

    const instance = AuthForm({ isLogin: true, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    await instance.handleSubmit({ preventDefault: jest.fn() });

    expect(currentErrorValue).toBe(errorMessage);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test('Debería usar un mensaje genérico si el servidor responde con estado no-ok pero no envía un mensaje explícito', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({})
    });

    const mockStateOverrides = {
      formData: { email: 'error@liberta.com', password: '123' }
    };

    const instance = AuthForm({ isLogin: true, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    await instance.handleSubmit({ preventDefault: jest.fn() });

    expect(currentErrorValue).toBe('Error en la autenticación.');
  });

  test('Debería manejar colapsos de red (Fetch Reject) de manera robusta sin tumbar la aplicación', async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network Connection Failed"));

    const mockStateOverrides = {
      formData: { email: 'crash@liberta.com', password: '123' }
    };

    const instance = AuthForm({ isLogin: true, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    await instance.handleSubmit({ preventDefault: jest.fn() });

    expect(currentErrorValue).toBe("Network Connection Failed");
  });

  test('Debería asegurar que el estado loading pase a falso al finalizar la ejecución (bloque finally)', async () => {
    global.fetch.mockRejectedValueOnce(new Error("Fatal Error"));

    const mockStateOverrides = {
      formData: { email: 'loading@liberta.com', password: '123' }
    };

    const instance = AuthForm({ isLogin: true, setIsLogin: mockSetIsLogin, mockNavigate, mockStateOverrides });
    await instance.handleSubmit({ preventDefault: jest.fn() });

    expect(currentLoadingValue).toBe(false);
  });
});