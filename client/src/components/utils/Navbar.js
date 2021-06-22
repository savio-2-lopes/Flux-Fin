import React from 'react';
// Router
import { Link } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Logout
import { logout } from '../../actions/auth';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return '';
  }

  return (
    <nav className='navbar'>
      <Link to='/dashboard'></Link>
      <Link to='/dashboard'>
        <img src="/images/logo_inicial.png" alt="logo" />
      </Link>
      <Link to='/' onClick={() => dispatch(logout())}>
        Logout
      </Link>
    </nav>
  );
};
export default Navbar;