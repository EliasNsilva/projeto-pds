import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#455d7a",
    color: "#e3e3e3",
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: "#455d7a",
    color: "#e3e3e3",
}));

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
}

export default function Sidebar({ handleProblemGrid, handleExecuteGrid }) {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [userState, setUserState] = useState({});

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    //useEffect(() => { }, [location]);
    //console.log('Current route:', location.pathname);
    useEffect(() => {
        // Retrieve from local storage
        const checkLogin = () => {
            const token = localStorage.getItem('token')?.replace(/"/g, '');
            const username = localStorage.getItem('username')?.replace(/"/g, '');
            const email = localStorage.getItem('email')?.replace(/"/g, '');

            if (!token || !username || !email) {
                return false;
            }

            if(location.pathname === '/login' || location.pathname === '/register') {
                navigate("/problems");
                return false;
            }              

            setUserState({ token, username, email });
            return true;
        }

        setIsLogged(checkLogin());
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <Typography variant="h6" noWrap component="div">
                            PiOne
                        </Typography>
                    </div>

                    {isLogged && <div className='ml-auto'>
                        <Typography variant="h6" noWrap component="div">
                            {userState.username}
                        </Typography>
                    </div>}

                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: "#e3e3e3",
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <b>Menu</b>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <List>
                    <ListItem key="Home" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="Problemas" disablePadding onClick={() => navigate("/problems")}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Problemas" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="Trilha" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Trilha" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key="Perfil" disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Perfil" />
                        </ListItemButton>
                    </ListItem>

                    <Divider />

                    {handleProblemGrid &&
                        <ListItem key="OcultarProblema" disablePadding onClick={() => handleProblemGrid()}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <VisibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Informações do Problema" />
                            </ListItemButton>
                        </ListItem>
                    }

                    {handleExecuteGrid &&
                        <ListItem key="OcultarExecucao" disablePadding onClick={() => handleExecuteGrid()}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <VisibilityIcon />
                                </ListItemIcon>
                                <ListItemText primary="Valores de Execução" />
                            </ListItemButton>
                        </ListItem>
                    }

                    <Divider />

                    {isLogged &&
                        <ListItem key="Sair" disablePadding onClick={() => {
                            handleLogout()
                            navigate("/login")
                        }
                        }>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItemButton>
                        </ListItem>
                    }
                </List>
            </Drawer>
        </Box>
    );
}