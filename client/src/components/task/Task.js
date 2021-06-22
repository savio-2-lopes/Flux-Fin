import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { getTask } from '../../actions/kambam';
import TaskTitle from './TaskTitle';
import TaskMenu from './TaskMenu';
import Card from '../card/Card';
import CreateCardForm from './CreateCardForm';
import Button from '@material-ui/core/Button';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const Task = ({ taskId, index }) => {
  const [addingCard, setAddingCard] = useState(false);
  const task = useSelector((state) =>
    state.kambam.kambam.taskObjects.find((object) => object._id === taskId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTask(taskId));
  }, [dispatch, taskId]);

  const createCardFormRef = useRef(null);
  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  return !task || (task && task.archived) ? (
    ''
  ) : (
    <Draggable
      draggableId={taskId}
      index={index}
    >
      {(provided) => (
        <div
          className='list-wrapper'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className='list-top'>
            <TaskTitle task={task} />
            <TaskMenu taskId={taskId} />
          </div>

          <Droppable
            droppableId={taskId}
            type='card'
          >
            {(provided) => (
              <div
                className={`list ${addingCard ? 'adding-card' : 'not-adding-card'}`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className='cards'>
                  {task.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      task={task}
                      index={index}
                    />
                  ))}
                </div>

                {provided.placeholder}
                {addingCard && (
                  <div ref={createCardFormRef}>
                    <CreateCardForm
                      taskId={taskId}
                      setAdding={setAddingCard}
                    />
                  </div>
                )}
              </div>
            )}
          </Droppable>

          {!addingCard && (
            <div className='create-card-button'>
              <ThemeProvider theme={theme}>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => setAddingCard(true)}
                >
                  <span style={{ color: "white" }}>
                    + Adicionar card
                  </span>
                </Button>
              </ThemeProvider>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

Task.propTypes = {
  taskId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Task;
