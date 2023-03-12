import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RequireAuth, useSignOut, useAuthUser } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import './App.css';

import { NavigateFunction, useNavigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Loans from './pages/Loans';

import EventBus from './common/EventBus';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import axios from 'axios';
import { useAuthHeader } from 'react-auth-kit';

const App = () => {
  const [currentUser, setCurrentUser] = useState<AuthStateUserObject | undefined>(undefined);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const signOut = useSignOut();
  const auth = useAuthUser();

  try {
    const authHeader = useAuthHeader();
    const token = authHeader();
    if (token) {
      // config.headers.Authorization = token;
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
  } catch (e) { console.log('error', e) }

  const navigate: NavigateFunction = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (path?: string) => {
    setAnchorElNav(null);
    if (path) {
      navigate(path);
    }
  };

  const handleCloseUserMenu = (action?: () => void) => {
    setAnchorElUser(null);
    if (action) {
      action();
    }
  };

  useEffect(() => {
    const user = auth();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on('logout', logOut);

    return () => {
      EventBus.remove('logout', logOut);
    };
  }, []);

  const logOut = () => {
    signOut();
    setCurrentUser(undefined);
    navigate('/');
    window.location.reload();
  };

  const pages = [{ name: 'Home', path: '/' }, { name: 'Contacts', path: '/contacts' }, { name: 'Loans', path: '/loans' }, { name: 'Payments', path: '/payments' }];
  const settings = [{ name: 'Profile', path: '/profile' }, { name: 'Logout', action: logOut, path: '/' }];
  const notLogged = [{ name: 'Home', path: '/' }, { name: 'Login', path: '/login' }, { name: 'Register', path: '/register' }];

  return (
    <Box>
      <CssBaseline />
      <AppBar component='nav'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <MonetizationOnIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LM
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={() => { handleCloseNavMenu() }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {(currentUser && pages || notLogged).map((page) => (
                  <MenuItem key={page.name} onClick={() => { handleCloseNavMenu(page.path) }}>
                    <Typography textAlign='center'>{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {(currentUser && pages || notLogged).map((page) => (
                <Button
                  key={page.name}
                  onClick={() => { handleCloseNavMenu() }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  href={page.path}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {currentUser && (<Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={currentUser.username} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
              >
                {settings.map((setting) => (
                  <MenuItem key={typeof setting === 'string' ? setting : setting.name} href={setting.path} onClick={() => {
                    handleCloseUserMenu(typeof setting !== 'string' ? setting.action : undefined)
                  }}>
                    <Typography textAlign='center'>{typeof setting === 'string' ? setting : setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>)}
          </Toolbar>
        </Container>
      </AppBar>
      <Box component='main' sx={{ p: 3 }}>
        <Toolbar />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/home' element={<Home />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<RequireAuth loginPath='/login'><Profile /></RequireAuth>} />
          <Route path='/contacts' element={<RequireAuth loginPath='/login'><Contacts /></RequireAuth>} />
          <Route path='/loans' element={<RequireAuth loginPath='/login'><Loans /></RequireAuth>} />
          {/* <Route path='/user' element={<BoardUser />} />
           <Route path='/mod' element={<BoardModerator />} />
           <Route path='/admin' element={<BoardAdmin />} /> */}
        </Routes>
      </Box>
    </Box>
  );
};

export default App;