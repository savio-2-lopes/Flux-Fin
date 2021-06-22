import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Material UI 
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
// Card e Kambam
import { moveCard } from '../../actions/kambam';
import useStyles from '../../utils/modalStyles';
// Cor customizada do botão
const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const MoveCard = ({ cardId, setOpen, thisTask }) => {
  const classStyles = useStyles();
  const [taskObject, setTaskObject] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const tasks = useSelector((state) => state.kambam.kambam.tasks);

  const taskObjects = useSelector((state) =>
    state.kambam.kambam.taskObjects
      .sort((a, b) =>
        tasks.findIndex((id) => id === a._id) - tasks.findIndex((id) => id === b._id)
      )
      .filter((task) => !task.archived)
  );

  const cardObjects = useSelector((state) => state.kambam.kambam.cardObjects);
  const dispatch = useDispatch();

  useEffect(() => {
    setTaskObject(thisTask);
    setTaskTitle(thisTask.title);
  }, [thisTask, cardId]);

  useEffect(() => {
    if (taskObject) {
      const unarchivedTaskCards = taskObject.cards
        .map((id, index) => {
          const card = cardObjects.find((object) => object._id === id);
          const position = index;
          return { card, position };
        })
        .filter((card) => !card.card.archived);

      let cardPositions = unarchivedTaskCards.map((card) => card.position);

      if (taskObject !== thisTask) {
        cardPositions = cardPositions.concat(taskObject.cards.length);
      }

      if (taskObject.cards.length > 0) {
        setPositions(cardPositions);
        setPosition(thisTask.cards.findIndex((id) => id === cardId));
      } else {
        setPositions([0]);
        setPosition(0);
      }
    }
  }, [thisTask, cardId, taskObject, cardObjects]);

  const onSubmit = async () => {
    dispatch(
      moveCard(cardId, { fromId: thisTask._id, toId: taskObject._id, toIndex: position })
    );
    setOpen(false);
  };

  return (
    <div className={classStyles.moveCard}>
      <h3 className={classStyles.moveCardTitle}>
        Mover card
      </h3>

      <div>
        <FormControl className={classStyles.moveCardSelect}>
          <InputLabel shrink>Tasks</InputLabel>
          <Select
            value={taskTitle}
            required
            onChange={(e) => {
              setTaskTitle(e.target.value);
              setTaskObject(taskObjects.find((task) => task.title === e.target.value));
            }}
            displayEmpty
          >
            {taskObjects.map((task) => (
              <MenuItem
                key={task._id}
                value={task.title}
              >
                {task.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classStyles.moveCardSelect}>
          <InputLabel shrink>Posição</InputLabel>
          <Select
            value={position}
            required
            onChange={(e) => setPosition(e.target.value)}
            displayEmpty
          >
            {positions.map((position, index) => (
              <MenuItem key={position} value={position}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <ThemeProvider theme={theme}>
        <Button
          className={classStyles.button}
          variant='contained'
          color='primary'
          onClick={onSubmit}
        >
          <span style={{ color: "white" }}>
            Mover Card
          </span>
        </Button>
      </ThemeProvider>
    </div >
  );
};

MoveCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  thisTask: PropTypes.object.isRequired,
};

export default MoveCard;