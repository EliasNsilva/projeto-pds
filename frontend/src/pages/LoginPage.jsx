import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import './Problems.css';
import LogoEscura from '../components/images/LogoEscura.png';
import PiOneBACKGROUND from '../components/images/PiOneBACKGROUND.png';
import PiOneQuestão from '../components/images/PiOneQuestão.png';




import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SidebarMenu from '../components/SidebarMenu';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HttpsIcon from '@mui/icons-material/Https';

export default function Login() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/problems');
        }
    }, []);

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
            const response = await fetch('http://pds-2023-1-06.edge.net.br:9006/login/', {
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
            console.log(data)
            if (data.login_response.access_token) {
                toast.success('Login realizado com sucesso');
                localStorage.setItem('token', data.login_response.access_token);
                localStorage.setItem('username', JSON.stringify(data.login_response.username));
                localStorage.setItem('email', JSON.stringify(data.user_response.email));
                localStorage.setItem('avatar', JSON.stringify(data.user_response.avatar));

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
        <Grid container direction="column" className="problems-container rounded">
            <Grid
                container
                item
                direction="column"
                style={{
                    background: '#FFFFFF',
                    height: '100vh',
                    width: '100vw',
                    position: 'relative'
                }}
            >


                <Grid
                    container
                    item
                    style={{
                        background: '#FFFFFF',
                        height: '100vh',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-around',
                    }}
                >
                    {/* div da esquerda onde fica a area de login*/}
                    <div style={{ background: '#FFFFFF', flex: '1.5', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                        {/* div 1 - Logo do sistema*/}
                        <div style={{ width: '30vw', height: '10vh', backgroundColor: '#FFFFFF', marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={LogoEscura} alt="Logo Escura" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>

                        {/* div 2 - Subtitulo*/}
                        <div style={{
                            width: '30vw',
                            height: '10vh',
                            backgroundColor: '#FFFFFF',
                            marginTop: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'Nunito, sans-serif',
                            color: '#758F9E',
                            fontSize: '32px'
                        }}>
                            Olá, novamente!
                        </div>


                        {/* div 3 - Area pra fazer login*/}
                        <div style={{ width: '30vw', height: '50vh', backgroundColor: '#FFFFFF', marginTop: '15px', marginBottom: '15px' }}>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div style={{ position: 'relative', backgroundColor: '#FFFFFF', height: '5vh', marginTop: '10px', borderRadius: '14px', display: 'flex', alignItems: 'center' }}>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 border rounded-md  focus:none focus:outline-none"
                                        style={{
                                            borderColor: '#7F94A1'

                                        }}
                                        placeholder='Email'
                                    />
                                    <div style={{ position: 'absolute', right: '10px' }}>
                                        <AlternateEmailIcon style={{ color: '#7F94A1' }} />
                                    </div>
                                </div>


                                <div style={{ position: 'relative', backgroundColor: '#FFFFFF', height: '5vh', marginTop: '10px', borderRadius: '14px', display: 'flex', alignItems: 'center' }}>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="block w-full px-4 py-2 border rounded-md  focus:none focus:outline-none"
                                        style={{
                                            borderColor: '#7F94A1'
                                        }}
                                        placeholder='Senha'
                                    />
                                    <div style={{ position: 'absolute', right: '10px' }}>
                                        <HttpsIcon style={{ color: '#7F94A1' }} />
                                    </div>
                                </div>
                                <div style={{ position: 'relative', backgroundColor: '#FFFFFF', height: '3vh', marginTop: '4px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <a
                                        href="https://www.thehuxley.com/retry-password"
                                        className="text-xs hover:underline"
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            color: '#7F94A1',
                                            fontWeight: 'bold',
                                        }}

                                    >
                                        Recuperar senha
                                    </a>
                                </div>

                                <div className="mt-6">
                                    <button
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:bg-green-500"

                                        onClick={handleLogin}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Entrando...' : 'Entrar'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* div 4 - Texto que redireciona para o huxley para se cadastrar*/}
                        <div style={{ width: '30vw', height: '10vh', backgroundColor: '#FFFFFF', marginTop: '1px', marginBottom: '15px' }}>
                            <p className="mt-8 text-xs font-light text-center text-gray-700"
                                style={{ color: '#7F94A1' }}>
                                Ainda não tem conta?{' '}
                                <a
                                    href="https://www.thehuxley.com/signin"
                                    className="font-medium hover:underline"
                                    style={{ color: '#29C09B' }}
                                >
                                    Cadastre-se
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* div da direita com imagens*/}
                    <div style={{ background: '#002E49', flex: '2.0', alignItems: 'center', borderTopLeftRadius: '26px', borderBottomLeftRadius: '26px', justifyContent: 'center', padding: '8px' }}>
                        {/* div onde PIONE EH BACKGOUND*/}
                        <div style={{
                            width: '60vw',
                            height: '20vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderTopLeftRadius: '26px',
                            borderBottomLeftRadius: '26px',
                            backgroundImage: `url(${PiOneBACKGROUND})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center center',
                            backgroundSize: 'contain',
                            color: 'white',
                            fontFamily: 'Inter, sans-serif',
                            textAlign: 'center',
                        }}>
                            Eleve seu nível de conhecimento praticando.
                        </div>

                        {/* div com a foto do sistema*/}
                        <div style={{ width: '60vw', height: '77vh', backgroundColor: '#002E49', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTopLeftRadius: '26px', borderBottomLeftRadius: '26px' }}>
                            <img src={PiOneQuestão} alt="Logo Escura" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                    </div>
                </Grid>

            </Grid>
        </Grid>
    );
}

