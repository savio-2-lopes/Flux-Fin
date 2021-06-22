import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { moveTask } from '../../actions/kambam';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import useStyles from '../../utils/dialogStyles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#82c595', },
  },
});

const MoveTask = ({ taskId, closeMenu }) => {
  const classStyles = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [position, setPosition] = useState(0);
  const [positions, setPositions] = useState([0]);
  const tasks = useSelector((state) => state.kambam.kambam.tasks);
  const taskObjects = useSelector((state) => state.kambam.kambam.taskObjects);
  const dispatch = useDispatch();

  useEffect(() => {
    const mappedTaskObjects = taskObjects
      .sort((a, b) =>
        tasks.findIndex((id) => id === a._id) - tasks.findIndex((id) => id === b._id)
      )
      .map((task, index) => ({ task, index }));

    setPositions(
      mappedTaskObjects.filter((task) => !task.task.archived).map((task) => task.index)
    );

    setPosition(mappedTaskObjects.findIndex((task) => task.task._id === taskId));
  }, [tasks, taskId, taskObjects]);

  const onSubmit = async () => {
    dispatch(moveTask(taskId, { toIndex: position }));
    setOpenDialog(false);
    closeMenu();
  };

  return (
    <Fragment>
      <div
        onClick={() => setOpenDialog(true)}
      >
        Mover task
      </div>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <div className={classStyles.moveTaskTop}>
          <DialogTitle>{'Mover Task'}</DialogTitle>
          <Button onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </Button>
        </div>

        <DialogActions className={classStyles.moveTaskBottom}>
          <FormControl>
            <InputLabel shrink>Position</InputLabel>
            <Select
              value={position}
              required
              onChange={(e) => setPosition(e.target.value)}
              displayEmpty
            >
              {positions.map((position, index) => (
                <MenuItem
                  key={position}
                  value={position}
                >
                  {index + 1}
                </MenuItem>
              ))}
            </Select>

            <ThemeProvider theme={theme}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classStyles.moveTaskButton}
                onClick={onSubmit}
              >
                Mover task
              </Button>
            </ThemeProvider>
          </FormControl>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

MoveTask.propTypes = {
  taskId: PropTypes.string.isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default MoveTask;
