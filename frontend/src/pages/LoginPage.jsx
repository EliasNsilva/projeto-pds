import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SidebarMenu from '../components/SidebarMenu';

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error('Email e/ou senha incorretos');
        setIsSubmitting(false);
        return;
      }

      const data = await response.json();

      if (data.access_token) {
        toast.success('Login realizado com sucesso');
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', JSON.stringify(data.username));
        localStorage.setItem('email', JSON.stringify(formData.username));

        setTimeout(() => {
          navigate('/problems');
        }, 3000);
      } else {
        toast.error('Consulte o administrador do sistema');
        setIsSubmitting(false);
      }
    } catch (error) {
      toast.error('Erro ao realizar login');
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <SidebarMenu />

      <div className="first-color relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="fourth-color w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-xl font-semibold text-center">Login</h1>
          <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-2">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-800"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <a
              href="https://www.thehuxley.com/retry-password"
              className="text-xs hover:underline"
            >
              Esqueceu a senha?
            </a>
            <div className="mt-6">
              <button
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                onClick={handleLogin}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </div>
          </form>
          <p className="mt-8 text-xs font-light text-center text-gray-700">
            Não tem conta no Huxley?{' '}
            <a
              href="https://www.thehuxley.com/signin"
              className="font-medium hover:underline"
            >
              Cadastre-se aqui
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
