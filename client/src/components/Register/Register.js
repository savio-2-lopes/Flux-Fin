import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// Redux
import { register } from '../../actions/auth';
import { useSelector, useDispatch } from 'react-redux';
import logoImg from '../../assets/logo_principal.png';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: '',
    password: '',
  });

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const { name, email, avatar, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register({ name, avatar, email, password }));
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='form-content-right'>
      <img
        src={logoImg}
        className="logo-content"
        draggable="false"
        alt="Logo"
      />

      <form
        className='form'
        onSubmit={(e) => onSubmit(e)}
      >
        <div className='form-inputs mt-4'>
          <label className='hidden'>Nome Fantasia</label>
          <input
            className='form-input'
            name='name'
            placeholder='Nome Fantasia'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='form-inputs mt-3'>
          <label className='hidden'>Email</label>
          <input
            className='form-input'
            id='email'
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='form-inputs mt-3'>
          <label className='hidden'>Senha</label>
          <input
            className='form-input'
            name='password'
            placeholder='Senha'
            type='password'
            value={password}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div className='form-inputs mt-3'>
          <label className='hidden'>Link da foto</label>
          <input
            className='form-input'
            name='avatar'
            required
            placeholder='Link da imagem'
            autoFocus
            value={avatar}
            onChange={(e) => onChange(e)}
          />
        </div>

        <span className='form-input-login form-column-left mt-2'>
          <Link className="link" to='/'>
            Já possuo cadastro
          </Link>
        </span>

        <button
          className='form-input-btn mt-3'
          type='submit'
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};