import React from 'react';
import styled from "styled-components";
import { IconContext } from 'react-icons';
// Router
import { Link } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
// Sidebar data
import { SidebarData } from './SidebarData';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return '';
  }

  return (
    <Container>
      <IconContext.Provider value={{ color: 'var(--gray-200)' }}>
        <nav className="nav-menu active">
          <ul className='nav-menu-items'>
            <li className='navbar-toggle'></li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`  
.navbar {
  justify-content: flex-start;
  background-color: #dcdce6;
  align-items: center;
  display: flex;
}

.nav-menu {
  background-color: var(--gray-50);
  justify-content: center;
  transition: 850ms;
  position: fixed;
  height: 100vh;
  display: flex;
  width: 60px;
  left: 100%;
  top: 0;
}

.nav-menu.active {
  left: 0;
  transition: 350ms;
}

.nav-text {
  justify-content: flex-start;
  align-items: center;
  padding: 25px -5px;
  list-style: none;
  display: flex;
  height: 60px;
  opacity: 0.5;
}

@media (max-width: 700px) {
  .nav-text-help {
    margin-top: 10rem;
  }  
}
.nav-text-help {
  margin-bottom: 2rem;
  margin-top: 21rem;
  opacity: 0.5;
}

.nav-text-answer {
  opacity: 0.5;
}

.nav-text-answer a,
.nav-text-help a,
.nav-text a {
  text-decoration: none;
  align-items: center;
  font-size: 22px;
  padding: 0 18px;
  color: #f5f5f5;
  display: flex;
  height: 100%;
  width: 100%;
}

.nav-text-answer a:hover,
.nav-text-help a:hover,
.nav-text a:hover {
  transition: all 0.5s ease-out;
  opacity: 0.4;
}

.nav-menu-items {
  width: 100%;
}
`;