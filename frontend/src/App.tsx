import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import * as AuthService from './services/auth.service';
import IUser from './types/user.type';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Profile from './components/Profile';
import Home from './components/Home';

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
import AdbIcon from '@mui/icons-material/Adb';

const App = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on('logout', logOut);

    return () => {
      EventBus.remove('logout', logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  const pages = [{ name: 'Home', path: '/' }, { name: 'Contacts', path: '/contacts' }, { name: 'Profile', path: '/profile' }];
  const settings = [{ name: 'Profile', path: '/profile' }, { name: 'Logout', action: logOut, path: '/' }];
  const notLogged = [{ name: 'Home', path: '/' }, { name: 'Login', path: '/login' }, { name: 'Register', path: '/register' }];

  return (
    <Box>
      <CssBaseline />
      <AppBar component='nav'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
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
              LOGO
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
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {(currentUser && pages || notLogged).map((page) => (
                <Button
                  key={page.name}
                  onClick={() => { handleCloseNavMenu(page.path) }}
                  sx={{ my: 2, color: 'white', display: 'block' }}
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
                  <MenuItem key={typeof setting === 'string' ? setting : setting.name} onClick={() => {
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
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/user' element={<BoardUser />} />
           <Route path='/mod' element={<BoardModerator />} />
           <Route path='/admin' element={<BoardAdmin />} /> */}
        </Routes>
      </Box>
    </Box>
    // <div>
    //   <nav className='navbar navbar-expand navbar-dark bg-dark'>
    //     <Link to={'/'} className='navbar-brand'>
    //       bezKoder
    //     </Link>
    //     <div className='navbar-nav mr-auto'>
    //       <li className='nav-item'>
    //         <Link to={'/'} className='nav-link'>
    //           Home
    //         </Link>
    //       </li>

    //       {currentUser && (
    //         <li className='nav-item'>
    //           <Link to={'/user'} className='nav-link'>
    //             User
    //           </Link>
    //         </li>
    //       )}
    //     </div>

    //     {currentUser ? (
    //       <div className='navbar-nav ml-auto'>
    //         <li className='nav-item'>
    //           <Link to={'/profile'} className='nav-link'>
    //             {currentUser.username}
    //           </Link>
    //         </li>
    //         <li className='nav-item'>
    //           <a href='/login' className='nav-link' onClick={logOut}>
    //             LogOut
    //           </a>
    //         </li>
    //       </div>
    //     ) : (
    //       <div className='navbar-nav ml-auto'>
    //         <li className='nav-item'>
    //           <Link to={'/login'} className='nav-link'>
    //             Login
    //           </Link>
    //         </li>

    //         <li className='nav-item'>
    //           <Link to={'/register'} className='nav-link'>
    //             Sign Up
    //           </Link>
    //         </li>
    //       </div>
    //     )}
    //   </nav>

    //   <div className='container mt-3'>
    //     <Routes>
    //       <Route path='/' element={<Home />} />
    //       {/* <Route path='/home' element={<Home />} /> */}
    //       <Route path='/login' element={<Login />} />
    //       <Route path='/register' element={<Register />} />
    //       <Route path='/profile' element={<Profile />} />
    //       {/* <Route path='/user' element={<BoardUser />} />
    //       <Route path='/mod' element={<BoardModerator />} />
    //       <Route path='/admin' element={<BoardAdmin />} /> */}
    //     </Routes>
    //   </div>
    // </div>
  );
};

export default App;