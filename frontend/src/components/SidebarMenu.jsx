import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
}

export default function Sidebar({ handleProblemGrid, handleExecuteGrid }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [isLogged, setIsLogged] = useState(false);
    const [userState, setUserState] = useState({});

    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

            if (!token || !username || !email) {
                return false;
            }

            if (location.pathname === '/login' || location.pathname === '/register') {
                navigate("/problems");
                return false;
            }

            setUserState({ token, username, email });
            return true;
        }

        setIsLogged(checkLogin());
    }, []);

    return (
        <div>
            <nav className="relative px-2 py-2 flex justify-between items-center bg-white">
                <a className="text-3xl font-bold leading-none" href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="86" height="32" viewBox="0 0 512 161"><path fill="#FF385C" d="M147.508 113.996c-.72-2.022-1.562-3.978-2.363-5.79a540.89 540.89 0 0 0-3.772-8.282l-.1-.215a1852.883 1852.883 0 0 0-35.53-72.668l-.529-1.024a472.824 472.824 0 0 0-3.926-7.505A48.76 48.76 0 0 0 95.51 9.62a26.897 26.897 0 0 0-9.248-7.098a26.951 26.951 0 0 0-22.776.003a26.895 26.895 0 0 0-9.246 7.1a48.97 48.97 0 0 0-5.773 8.89a480.76 480.76 0 0 0-3.962 7.574l-.49.95A1854.565 1854.565 0 0 0 8.484 99.71l-.162.35a547.21 547.21 0 0 0-3.709 8.145c-.8 1.811-1.641 3.766-2.362 5.793a35.508 35.508 0 0 0-1.916 17.308a34.195 34.195 0 0 0 6.924 16.173a34.282 34.282 0 0 0 14.055 10.606a34.861 34.861 0 0 0 13.151 2.544c1.416 0 2.831-.083 4.238-.247a43.244 43.244 0 0 0 16.172-5.456c6.523-3.665 12.966-9.036 20.004-16.711c7.038 7.675 13.48 13.046 20.004 16.71a43.225 43.225 0 0 0 16.172 5.457a36.67 36.67 0 0 0 4.238.247c4.507.01 8.973-.854 13.15-2.544a34.286 34.286 0 0 0 14.056-10.606a34.194 34.194 0 0 0 6.924-16.173a35.54 35.54 0 0 0-1.915-17.31Zm-72.629 8.367c-8.713-11.044-14.303-21.3-16.265-29.897a26.439 26.439 0 0 1-.56-9.857a16.106 16.106 0 0 1 2.593-6.739a17.952 17.952 0 0 1 6.302-5.15a17.996 17.996 0 0 1 15.862.002a17.95 17.95 0 0 1 6.301 5.15a16.115 16.115 0 0 1 2.593 6.74a26.447 26.447 0 0 1-.562 9.86c-1.964 8.597-7.553 18.85-16.264 29.891Zm64.368 7.489a23.911 23.911 0 0 1-4.841 11.307a23.971 23.971 0 0 1-9.828 7.416a25.051 25.051 0 0 1-12.336 1.614a32.586 32.586 0 0 1-12.317-4.207c-5.807-3.262-11.685-8.27-18.3-15.617c10.53-12.983 17.106-24.95 19.54-35.61a36.568 36.568 0 0 0 .7-13.7a26.272 26.272 0 0 0-4.274-10.985a28.21 28.21 0 0 0-9.989-8.427a28.256 28.256 0 0 0-25.444 0a28.2 28.2 0 0 0-9.99 8.425a26.272 26.272 0 0 0-4.274 10.981a36.583 36.583 0 0 0 .696 13.696c2.433 10.663 9.009 22.634 19.542 35.621c-6.614 7.346-12.492 12.354-18.299 15.617a32.584 32.584 0 0 1-12.317 4.206a25.054 25.054 0 0 1-12.337-1.614a23.972 23.972 0 0 1-9.827-7.415a23.91 23.91 0 0 1-4.84-11.308a25.183 25.183 0 0 1 1.426-12.42c.574-1.616 1.247-3.2 2.08-5.084a542.847 542.847 0 0 1 3.639-7.991l.162-.352a1844.428 1844.428 0 0 1 35.336-72.266l.492-.955c1.26-2.443 2.562-4.97 3.876-7.411a39.647 39.647 0 0 1 4.539-7.087a16.65 16.65 0 0 1 25.631-.002a39.463 39.463 0 0 1 4.54 7.084c1.301 2.42 2.592 4.924 3.841 7.345l.53 1.027a1842.197 1842.197 0 0 1 35.335 72.267l.1.216c1.23 2.663 2.503 5.415 3.701 8.126c.834 1.886 1.508 3.472 2.081 5.082a25.202 25.202 0 0 1 1.426 12.42Zm69.993-8.782c-4.01 0-7.7-.803-11.07-2.411s-6.257-3.86-8.824-6.753c-2.567-2.894-4.492-6.27-5.937-9.969c-1.444-3.859-2.086-8.04-2.086-12.541c0-4.502.803-8.844 2.247-12.703c1.444-3.858 3.53-7.235 6.097-10.29c2.567-2.894 5.615-5.306 9.145-6.914c3.53-1.608 7.22-2.412 11.392-2.412c4.01 0 7.54.804 10.75 2.573c3.209 1.608 5.776 4.02 7.861 7.074l.482-7.878h14.76v60.617h-14.76l-.482-8.843c-2.085 3.215-4.813 5.788-8.343 7.717c-3.209 1.77-7.06 2.734-11.231 2.734Zm3.852-14.47c2.888 0 5.455-.804 7.862-2.251c2.246-1.608 4.01-3.698 5.455-6.27c1.283-2.573 1.925-5.628 1.925-9.005c0-3.377-.642-6.432-1.925-9.004c-1.284-2.573-3.21-4.663-5.455-6.27c-2.247-1.609-4.974-2.252-7.862-2.252s-5.455.804-7.862 2.251c-2.246 1.608-4.011 3.698-5.455 6.27c-1.284 2.573-1.926 5.628-1.926 9.005c0 3.377.642 6.432 1.926 9.004c1.283 2.573 3.209 4.663 5.455 6.27c2.407 1.448 4.974 2.252 7.862 2.252Zm56.156-64.155c0 1.769-.321 3.377-1.124 4.663a9.273 9.273 0 0 1-3.369 3.216c-1.444.804-3.048 1.125-4.652 1.125c-1.605 0-3.21-.321-4.654-1.125a9.273 9.273 0 0 1-3.369-3.216c-.802-1.447-1.123-2.894-1.123-4.663c0-1.768.32-3.376 1.123-4.663c.802-1.447 1.925-2.411 3.37-3.215c1.443-.804 3.048-1.126 4.653-1.126c1.604 0 3.208.322 4.652 1.126a9.272 9.272 0 0 1 3.37 3.215c.641 1.287 1.123 2.734 1.123 4.663Zm-17.168 76.857V58.685h16.044v60.617H252.08Zm58.884-44.7v.162c-.802-.322-1.765-.483-2.568-.643c-.962-.161-1.765-.161-2.727-.161c-4.493 0-7.862 1.286-10.108 4.02c-2.407 2.733-3.53 6.592-3.53 11.576v29.746h-16.044V58.685h14.76l.482 9.165c1.604-3.216 3.53-5.628 6.257-7.396c2.567-1.77 5.615-2.573 9.145-2.573c1.124 0 2.247.16 3.21.321c.48.161.801.161 1.123.322v16.079Zm6.417 44.7v-85.54h16.045v32.64c2.246-2.893 4.813-5.145 8.022-6.913c3.21-1.608 6.74-2.573 10.75-2.573s7.701.804 11.07 2.412c3.37 1.608 6.258 3.859 8.825 6.753c2.568 2.894 4.493 6.271 5.937 9.97c1.444 3.858 2.085 8.038 2.085 12.54c0 4.503-.802 8.844-2.245 12.703c-1.445 3.859-3.53 7.235-6.098 10.29c-2.567 2.895-5.615 5.306-9.145 6.914c-3.53 1.608-7.22 2.412-11.391 2.412c-4.012 0-7.541-.804-10.75-2.573c-3.21-1.608-5.777-4.02-7.862-7.074l-.482 7.878l-14.76.161Zm30.966-12.702c2.889 0 5.456-.804 7.862-2.251c2.246-1.608 4.011-3.698 5.455-6.27c1.284-2.573 1.926-5.628 1.926-9.005c0-3.377-.642-6.432-1.926-9.004c-1.444-2.573-3.209-4.663-5.455-6.27c-2.246-1.609-4.973-2.252-7.862-2.252c-2.888 0-5.455.804-7.861 2.251c-2.247 1.608-4.012 3.698-5.456 6.27c-1.283 2.573-1.925 5.628-1.925 9.005c0 3.377.642 6.432 1.925 9.004c1.284 2.573 3.21 4.663 5.456 6.27c2.406 1.448 4.973 2.252 7.861 2.252Zm37.866 12.702V58.685h14.76l.482 7.879c1.765-2.895 4.171-5.146 7.22-6.914c3.048-1.769 6.578-2.573 10.59-2.573c4.492 0 8.342 1.125 11.551 3.216c3.37 2.09 5.937 5.145 7.702 9.004c1.765 3.859 2.727 8.521 2.727 13.828v36.338h-16.044V85.215c0-4.18-.963-7.557-2.888-9.97c-1.925-2.41-4.493-3.697-7.862-3.697c-2.407 0-4.493.482-6.418 1.608c-1.765 1.125-3.209 2.572-4.332 4.663c-1.123 1.929-1.604 4.34-1.604 6.753v34.73h-15.884Zm63.054 0v-85.54h16.045v32.64c2.246-2.893 4.813-5.145 8.022-6.913c3.21-1.608 6.74-2.573 10.75-2.573c4.012 0 7.702.804 11.071 2.412c3.37 1.608 6.257 3.859 8.824 6.753c2.57 2.894 4.492 6.271 5.938 9.97c1.446 3.858 2.083 8.038 2.083 12.54c0 4.503-.798 8.844-2.244 12.703c-1.445 3.859-3.529 7.235-6.099 10.29c-2.566 2.895-5.614 5.306-9.144 6.914c-3.53 1.608-7.22 2.412-11.391 2.412c-4.011 0-7.541-.804-10.75-2.573c-3.21-1.608-5.776-4.02-7.862-7.074l-.481 7.878l-14.762.161Zm31.127-12.702c2.888 0 5.455-.804 7.862-2.251c2.246-1.608 4.01-3.698 5.455-6.27c1.284-2.573 1.926-5.628 1.926-9.005c0-3.377-.642-6.432-1.926-9.004c-1.283-2.573-3.209-4.663-5.455-6.27c-2.247-1.609-4.974-2.252-7.862-2.252s-5.455.804-7.862 2.251c-2.246 1.608-4.01 3.698-5.455 6.27c-1.444 2.573-1.926 5.628-1.926 9.005c0 3.377.643 6.432 1.926 9.004c1.284 2.573 3.21 4.663 5.455 6.27c2.407 1.448 4.814 2.252 7.862 2.252Z" /></svg>
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
                        <a className="font-medium text-gray-700 hover:text-gray-900" href="#">Home</a>
                    </li>
                    <li className="text-sm">
                        <a className="font-medium text-gray-700 hover:text-gray-900" href="#">Aprendizado</a>
                    </li>
                    <li className="text-sm">
                        <a className="font-medium text-gray-700 hover:text-gray-900" href="/problems">Problemas</a>
                    </li>
                    <li className="text-sm">
                        <a className="font-medium text-gray-700 hover:text-gray-900" href="#">Sobre</a>
                    </li>
                </ul>
                {!isLogged ?
                    <div className='flex items-center justify-center'>
                        <a
                            className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-1 px-5 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
                            href="/login"
                        >
                            Login
                        </a>

                        <a
                            className="hidden lg:inline-block py-1 px-5 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                            href="/"
                        >
                            Cadastro
                        </a>
                    </div> :
                    <div className='flex items-center justify-center'>
                        <a
                            className="hidden lg:inline-block lg:ml-auto py-1 px-2 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
                            href="#"
                        >
                            {userState.username}
                        </a>
                        <a
                            className="hidden lg:inline-block py-1 px-4 text-sm text-white font-bold rounded-xl transition duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 222"><path fill="#FFF" d="M181.243 159.987c-20.79-2.459-31.18-15.497-33.056-18.087c-4.126-5.696-8.794-15.872-12.795-25.069c-1.208-2.778-5.508-3.292-7.085-3.382l-.59-.014c-.736.007-6.28.146-7.696 3.396c-4.008 9.19-8.662 19.359-12.795 25.069c-1.875 2.59-12.273 15.635-33.056 18.087c-3.619.438-7.446.646-11.412.646c-8.676 0-17.254-1.014-24.173-2.75l7.085 28.603l58.93 24.284l21.915 2.646l21.762-2.646l58.93-24.284l6.933-27.985c-6.397 1.34-13.913 2.132-21.505 2.132c-3.945 0-7.787-.208-11.392-.646Zm-27.971 36.953H99.335v-5.696h24.117v-12.058a140.211 140.211 0 0 1-5.063-.875c-2.334-.445-4.654-.931-6.94-1.57c-2.063-.563-4.23-1.195-6.084-2.3c-3.355-2.02-5.89-5.917-3.835-9.758c.98-1.82 2.723-3.508 4.668-4.251c2.202-.848 4.737-.959 7.078-1.042c-1.326.048.896 0 .236-.007h-.118h.118c2.438 0 4.856.062 7.3.222c2.175.146 4.404.632 6.565.382c4.71-.535 9.544-.854 14.28-.444c2.133.187 4.488.444 6.273 1.736c1.66 1.209 3.147 2.841 3.675 4.87c1.034 3.965-2.327 7.418-5.655 8.946c-4.167 1.917-8.974 2.743-13.461 3.528c-1.111.195-2.23.382-3.348.563v12.058h24.13v5.696Zm71.856-102.294c-2.945-.903-6.814-1.598-12.03-2.008c-6.224-.472-14.371-.52-25.2.014c0 0-17.053 1.493-27.048 4.953c-5.425 1.882-12.184 4.779-13.774 9.794c-1.59 5.015-.348 16.066 2.16 21.977c2.507 5.925 9.009 13.836 14.475 17.532c5.057 3.431 14.775 7.661 28.125 7.578c8.238-.049 16.92-.84 24.124-3.272c3.077-1.035 5.897-2.368 8.28-4.077c2.312-1.653 4.174-3.619 5.681-5.73c3.696-5.182 5.251-11.343 5.98-16.595c1.022-7.397 2.175-20.046-2.166-24.943c-1.765-1.993-4.126-3.841-8.607-5.223ZM91.716 146.915c5.46-3.696 11.96-11.614 14.454-17.532c2.515-5.918 3.765-16.962 2.168-21.978c-1.591-5.015-8.343-7.918-13.774-9.793c-9.989-3.46-27.048-4.953-27.048-4.953c-12.364-.618-21.255-.458-27.757.215c-5.522.584-9.342 1.55-12.1 2.751c-2.848 1.222-4.591 2.695-5.973 4.258c-4.335 4.897-3.196 17.539-2.175 24.943c.57 4.084 1.64 8.717 3.82 13.01c1.772 3.487 4.287 6.766 7.864 9.315c1.632 1.174 3.494 2.167 5.473 3.021c7.683 3.258 17.58 4.272 26.923 4.328c13.337.07 23.061-4.154 28.125-7.585ZM47.504 84.15c10.502.083 21.074.82 31.618 2.23c5.87.785 11.718 1.764 17.532 2.952c4.738 1.02 8.53 1.966 11.878 2.8c7.405 1.854 12.295 3.062 19.199 3.076c6.883-.014 11.76-1.236 19.157-3.077c3.348-.833 7.14-1.778 11.85-2.792c5.168-1.063 10.35-1.931 15.552-2.674c10.343-1.466 20.72-2.307 31.042-2.48c1.431-.028 2.876-.056 4.314-.056c.785 0 1.57.007 2.34.014l-.569-4.286l-.278-.868l-13.177-39.446l-32.952-6.453l-38.48-7.516v-.014h-.029s-.013 0-.048.007c-.035-.007-.056-.007-.056-.007h-.027v.021c-1.445.16-20.491 3.89-38.558 7.453c-16.865 3.32-32.876 6.516-32.876 6.516L41.76 78.996l-.292.868l-.563 4.328a222 222 0 0 1 4.87-.056c.576-.007 1.153.014 1.729.014Z" /><path fill="#454545" d="M252.92 88.512c-.132-.041-10.774-2.848-28.806-3.938l-1.007-9.697l-2.146-6.432l12.801-13.718c11.628-12.462 10.947-31.98-1.514-43.6l-2.438-2.279c-12.454-11.62-31.98-10.94-43.6 1.514l-11.03 11.822l-48.65-10.176v-.013h-.035s-.021 0-.056.006c-.042-.006-.063-.006-.063-.006h-.027v.02c-1.785.202-26.895 5.48-48.734 10.1l-10.96-11.746C55.046-2.092 35.521-2.766 23.067 8.855l-2.438 2.278c-12.454 11.628-13.135 31.14-1.514 43.6l12.808 13.719l-2.153 6.432l-1.014 9.857c-16.483 1.201-26.152 3.737-26.263 3.778C.792 89 .09 90.721.153 92.221l2.035 14.573l.875.466c2.8 1.486 3.515 3.73 7.314 17.01l.674 2.341c4.14 14.413 7.6 20.734 14.441 25.645l11.649 40.17l64.466 26.352l24.93 2.529l24.748-2.529l67.03-26.353l9.175-38.564c.104-.063.215-.125.32-.188c8.3-5.168 12.016-11.239 16.552-27.062l.68-2.375c3.793-13.253 4.502-15.49 7.308-16.976l.875-.466l2.015-14.378l.014-.188c.055-1.507-.64-3.23-2.334-3.716ZM41.46 79.857l.292-.868l13.176-39.446s16.018-3.196 32.876-6.516c18.067-3.57 37.113-7.293 38.558-7.453v-.014h.027s.021 0 .056.007c.035-.007.049-.007.049-.007h.027v.021l38.481 7.516l32.953 6.453l13.176 39.446l.278.868l.57 4.286c-.771-.007-1.556-.014-2.341-.014c-1.438 0-2.883.028-4.314.056c-10.315.173-20.692 1.014-31.042 2.48c-5.202.736-10.384 1.604-15.552 2.674c-4.71 1.014-8.502 1.959-11.85 2.792c-7.39 1.848-12.273 3.063-19.157 3.077c-6.904-.014-11.787-1.23-19.199-3.077c-3.348-.833-7.14-1.778-11.878-2.8a260.74 260.74 0 0 0-17.531-2.951a252.542 252.542 0 0 0-31.619-2.23c-.576 0-1.153-.02-1.736-.02c-1.66 0-3.293.02-4.87.055l.57-4.335Zm-4.8 70.301c-1.98-.854-3.84-1.847-5.473-3.021c-3.577-2.55-6.092-5.828-7.863-9.315c-2.174-4.292-3.25-8.925-3.82-13.01c-1.022-7.397-2.168-20.046 2.174-24.943c1.382-1.57 3.125-3.042 5.973-4.258c2.758-1.202 6.578-2.167 12.1-2.75c6.509-.681 15.393-.834 27.757-.216c0 0 17.052 1.494 27.048 4.953c5.431 1.882 12.19 4.779 13.774 9.794c1.597 5.015.354 16.066-2.168 21.977c-2.493 5.925-8.995 13.836-14.454 17.532c-5.064 3.431-14.788 7.661-28.132 7.578c-9.328-.042-19.226-1.063-26.916-4.32Zm170.554 36.335l-58.93 24.284l-21.763 2.646l-21.914-2.646l-58.93-24.284l-7.086-28.604c6.919 1.73 15.497 2.751 24.173 2.751c3.959 0 7.793-.208 11.412-.646c20.782-2.459 31.18-15.497 33.056-18.087c4.133-5.71 8.787-15.88 12.795-25.069c1.417-3.25 6.96-3.39 7.696-3.396l.59.014c1.577.097 5.877.604 7.085 3.382c4.001 9.197 8.67 19.373 12.795 25.069c1.875 2.59 12.267 15.635 33.056 18.087c3.612.438 7.446.646 11.406.646c7.592 0 15.107-.785 21.505-2.132l-6.946 27.985Zm28.687-61.674c-.73 5.251-2.285 11.413-5.98 16.594c-1.515 2.119-3.37 4.078-5.683 5.73c-2.389 1.71-5.202 3.043-8.28 4.078c-7.202 2.431-15.885 3.223-24.123 3.272c-13.35.083-23.068-4.147-28.125-7.578c-5.466-3.696-11.968-11.614-14.475-17.532c-2.5-5.918-3.75-16.962-2.16-21.978c1.59-5.015 8.349-7.918 13.774-9.793c9.988-3.46 27.048-4.953 27.048-4.953c10.829-.535 18.97-.486 25.2-.014c5.216.41 9.092 1.105 12.03 2.008c4.48 1.382 6.835 3.23 8.607 5.23c4.334 4.89 3.188 17.532 2.167 24.936Zm-106.754 54.36c1.118-.18 2.237-.368 3.348-.563c4.487-.784 9.294-1.604 13.461-3.528c3.328-1.528 6.696-4.98 5.654-8.947c-.527-2.028-2.014-3.66-3.674-4.869c-1.785-1.292-4.147-1.549-6.272-1.736c-4.737-.41-9.572-.09-14.281.444c-2.168.25-4.39-.23-6.564-.382a111.53 111.53 0 0 0-7.3-.222c.66.007-1.57.055-.237.007c-2.34.09-4.869.194-7.078 1.042c-1.945.743-3.688 2.438-4.668 4.25c-2.056 3.849.473 7.739 3.835 9.76c1.854 1.104 4.021 1.736 6.084 2.299c2.286.64 4.606 1.118 6.94 1.57c1.68.326 3.361.611 5.063.875v12.065H99.342v5.69h53.937v-5.69h-24.131V179.18Z" /></svg>
                        </a>
                        <Divider orientation='vertical' />
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