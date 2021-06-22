import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { login } from '../../actions/auth';
import logoImg from '../../assets/logo_principal.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const responseGoogle = (response) => {
    console.log(response)
    axios({
      method: "POST",
      url: "https://localhost:5000/users/googlelogin",
      data: { tokenId: response.tokenId }
    }).then(response => {
      console.log("Login com o Google foi realizado com sucesso", response)
    })
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
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
        <div className='form-inputs'>
          <label className='hidden'>Email</label>
          <input
            className='form-input'
            id="email"
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className='form-inputs'>
          <label className='hidden'>Senha</label>
          <input
            className='form-input'
            required
            name='password'
            placeholder='Senha'
            value={password}
            onChange={(e) => onChange(e)}
            type="password"
          />
        </div>

        <span className='form-input-login form-column-left mt-2'>
          <Link
            className="link"
            to='/register'
          >
            Não possui cadastro?
          </Link>
        </span>

        <button
          className='form-input-btn mt-3'
          type='submit'
        >
          Login
        </button>

        <div className="form-span">
          <div className="separator">Ou pelo Google</div>
        </div>

        <GoogleLogin
          className="login-google-button"
          clientId={process.env.REACT_APP_SECRET_GOOGLE_CLIENT}
          buttonText="Login com o google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </form>
    </div>
  );
};

export default Login;