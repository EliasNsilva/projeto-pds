import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logoclara from './images/Logoclara.png';


const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
}

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLogged, setIsLogged] = useState(false);
    const [userState, setUserState] = useState({});

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const [subMenuPosition, setSubMenuPosition] = useState({ top: 0, left: 0 });



    const toggleSubMenu = (event) => {
        const rect = event.target.getBoundingClientRect();
        setSubMenuPosition({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
        });
        setIsSubMenuOpen(!isSubMenuOpen);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        // Retrieve from local storage
        const checkLogin = () => {
            const token = localStorage.getItem('token')?.replace(/"/g, '');
            const username = localStorage.getItem('username')?.replace(/"/g, '');
            const email = localStorage.getItem('email')?.replace(/"/g, '');
            const avatar = localStorage.getItem('avatar')?.replace(/"/g, '');

            if (!token || !username || !email || !avatar) {
                return false;
            }

            if (location.pathname === '/login' || location.pathname === '/register') {
                navigate("/problems");
                return false;
            }

            setUserState({ token, username, email, avatar });
            return true;
        }

        setIsLogged(checkLogin());
    }, []);

    return (
        <div>
            <nav className="relative px-2 py-2 flex justify-between items-center bg-principalazul border-b-2 border-accordion-border">

                <a className="text-3xl font-bold leading-none" href="#">
                    <img src={Logoclara} alt="Logo Clara" width="86" height="32" style={{ margin: "10px" }} />
                </a>
                <div className="lg:hidden">
                    <button
                        className="navbar-burger flex items-center text-red-500 p-3"
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </button>
                </div>
                <ul className={`hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6 ${isMenuOpen ? '' : 'hidden'}`}>
                    <li className="text-sm">
                        <a className="font-medium text-accordion-border hover:text-gray-300" href="#">Home</a>
                    </li>
                    <li className="text-sm">
                        <a className="font-medium text-accordion-border hover:text-gray-300" href="#">Aprendizado</a>
                    </li>
                    <li className="text-sm">
                        <a className="font-medium text-accordion-border hover:text-gray-300" href="/problems">Problemas</a>
                    </li>
                    <li className="text-sm">
                        <a className="font-medium text-accordion-border hover:text-gray-300" href="#">Sobre</a>
                    </li>
                </ul>
                {!isLogged ?
                    <div className='flex items-center justify-center'>
                        <a
                            className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-1 px-5 bg-principalazul text-sm text-accordion-border hover:text-gray-300 font-bold rounded-xl transition duration-200 border border-accordion-border hover:border-gray-300"

                            href="/login"
                        >
                            Login
                        </a>

                        <a
                            className="hidden lg:inline-block py-1 px-5 bg-principalazul hover:bg-green-600 text-sm text-accordion-border hover:text-gray-300 font-bold rounded-xl transition duration-200 border border-accordion-border"

                            href="/"
                        >
                            Cadastro
                        </a>
                    </div> :
                    <div className='flex items-center justify-center relative'>
                        <a
                            className="hidden lg:inline-block lg:ml-auto py-1 px-2 bg-principalazul text-sm text-accordion-border hover:text-gray-300 font-bold rounded-xl transition duration-200 border border-accordion-border hover:border-gray-300"
                            href="#"
                            onClick={(e) => {
                                toggleSubMenu(e);
                            }}
                        >
                            {userState.username}
                            {/* Rei delas */}
                        </a>
                        {isSubMenuOpen && (
                            <ul className="absolute top-full left-2 bg-white border rounded-lg">
                                <li className="text-sm">
                                    <a
                                        className="hidden lg:inline-block lg:ml-auto py-1 px-4 bg-red-50 hover:bg-red-100 text-sm text-red-900 font-bold rounded-xl transition duration-200"
                                        onClick={() => {
                                            handleLogout()

                                            setUserState({})
                                            setIsLogged(false)

                                            navigate('/login')
                                        }}
                                    >
                                        Sair
                                    </a>
                                </li>
                            </ul>
                        )}
                        <a className="hidden lg:inline-block py-1 px-4 text-sm text-white font-bold rounded-xl transition duration-200">
                            {userState.avatar && <img src={userState.avatar} alt="User Avatar" className="rounded-full w-8 h-8 mr-2" />}
                        </a>
                        <Divider orientation='vertical' />

                    </div>
                }

            </nav>
            {isMenuOpen && (
                <div className="navbar-menu relative z-50">
                    <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" onClick={closeMenu}></div>
                    <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                        {/* Your mobile menu items here same off lg */}
                        <div className="flex items-center mb-8">
                        </div>
                    </nav>
                </div>
            )}
        </div>
    );
}