import React from 'react';
import styled from "styled-components";
// Register Components
import Register from '../Register/Register';
// Material UI
import { Container } from '@material-ui/core';
import wallpaper from '../../assets/wallpaper.png';

export default function RegisterPage() {
  return (
    <ContainerRegister>
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
          <Register />
        </div>
      </Container>
    </ContainerRegister>
  );
};

const ContainerRegister = styled.div`  
  background-color: var(--green-100);
`;