import React, { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from "styled-components";
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
// Navbar
import Navbar from '../utils/Navbar';
// Sidebar
import Sidebar from '../utils/Sidebar';
// Styles
import '../styles/Dashboard.css'
// Card e Kambam
import { getKambans } from '../../actions/kambam';
import CreateKambam from '../utils/CreateKambam';

const Dashboard = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const kambans = useSelector((state) => state.kambam.kambans);
  const loading = useSelector((state) => state.kambam.dashboardLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKambans());
  }, [dispatch]);

  useEffect(() => {
    document.title = 'Seu Kambam | Fluxfin';
  }, []);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <ContainerDashboard >
      <div className='dashboard-navbar'>
        <Sidebar />
        <Navbar />

        <section className='dashboard' >
          <h1>Bem vindo {user && user.name}</h1>
          {loading && <CircularProgress className='dashboard-loading' />}
          <div className='boards'>
            {kambans.map((kambam) => (
              <Link
                key={kambam._id}
                to={`/kambam/${kambam._id}`}
                className='board-card'
              >
                {kambam.title}
              </Link>
            ))}
            <CreateKambam />
          </div>
        </section>
      </div>
    </ContainerDashboard>
  );
};

export default Dashboard;

const ContainerDashboard = styled.div`  
  background-color: var(--green-25);
`;