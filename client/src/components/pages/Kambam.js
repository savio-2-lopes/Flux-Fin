import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from "styled-components";
// Drag and Drop
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Material UI
import { CircularProgress, Box } from '@material-ui/core';
// Card e Kambam
import { getKambam, moveCard, moveTask } from '../../actions/kambam';
import KambamDrawer from '../kambam/KambamDrawer';
import KambamTitle from '../kambam/KambamTitle';
import CreateTask from '../kambam/CreateTask';
import Members from '../kambam/Members';
import Sidebar from '../utils/Sidebar'
import Navbar from '../utils/Navbar';
import Task from '../task/Task';
// Styles
import '../styles/Dashboard.css'

const Kambam = ({ match }) => {
  const kambam = useSelector((state) => state.kambam.kambam);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getKambam(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (kambam?.title) document.title = kambam.title + ' | FLuxfin';
  }, [kambam?.title]);

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;

    if (!destination) { return; }

    if (type === 'card') {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveTask(draggableId, { toIndex: destination.index }));
    }
  };

  return !kambam ? (
    <ContainerKambam>
      <Fragment>
        <Sidebar />
        <Navbar />
        <Box className='board-loading'>
          <CircularProgress />
        </Box>
      </Fragment>
    </ContainerKambam>
  ) : (
    <ContainerKambam>
      <div
        className='dashboard-navbar'
      >
        <Sidebar />
        <Navbar />

        <section className='board'>
          <div className='board-top'>
            <div className='board-top-left'>
              <KambamTitle kambam={kambam} />
              <Members />
            </div>
            <KambamDrawer />
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId='all-lists'
              direction='horizontal'
              type='list'
            >
              {(provided) => (
                <div
                  className='tasks'
                  ref={provided.innerRef} {...provided.droppableProps}
                >
                  {kambam.tasks.map((taskId, index) => (
                    <Task
                      key={taskId}
                      taskId={taskId}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                  <CreateTask />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </section>
      </div>
    </ContainerKambam >
  );
};

export default Kambam;

const ContainerKambam = styled.div`  
  background-color: var(--green-25); 
`;