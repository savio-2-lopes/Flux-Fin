import React from 'react';
import styled from "styled-components";
// Material UI
import { Container } from '@material-ui/core';
// Login Components
import Login from '../Login/Login'
// Styles
import wallpaper from '../../assets/wallpaper.png';
import '../styles/Home.css'

export default function LoginPage() {
  return (
    <ContainerLogin>
      <Container>
        <div className='form-container'>
          <div className='form-content-left'>
            <img
              className='form-img'
              src={wallpaper}
              draggable="false"
              alt='wallpaper'
            />
          </div>
          <Login />
        </div>
      </Container>
    </ContainerLogin>
  );
};

const ContainerLogin = styled.div`
  background: var(--green-100);
`;