import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

import * as AuthService from './services/auth.service';
import IUser from './types/user.type';

import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Profile from './components/Profile';

import EventBus from './common/EventBus';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log('Logged user', user);
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

  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={'/'} className='navbar-brand'>
          bezKoder
        </Link>
        <div className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link to={'/'} className='nav-link'>
              Home
            </Link>
          </li>

          {currentUser && (
            <li className='nav-item'>
              <Link to={'/user'} className='nav-link'>
                User
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/profile'} className='nav-link'>
                {currentUser.username}
              </Link>
            </li>
            <li className='nav-item'>
              <a href='/login' className='nav-link' onClick={logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <Link to={'/login'} className='nav-link'>
                Login
              </Link>
            </li>

            <li className='nav-item'>
              <Link to={'/register'} className='nav-link'>
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<Profile />} />
          {/* <Route path='/home' element={<Home />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
          {/* <Route path='/user' element={<BoardUser />} />
          <Route path='/mod' element={<BoardModerator />} />
          <Route path='/admin' element={<BoardAdmin />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default App;