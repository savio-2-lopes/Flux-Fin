import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { archiveTask } from '../../actions/kambam';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoveTask from './MoveTask';

const TaskMenu = ({ taskId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const archive = async () => {
    dispatch(archiveTask(taskId, true));
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <MoreHorizIcon />
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <MoreHorizIcon />
        </MenuItem>

        <MenuItem
          onClick={() => {
            archive();
            handleClose();
          }}
        >
          Arquivar task
        </MenuItem>
        <MenuItem>
          <MoveTask
            taskId={taskId}
            closeMenu={handleClose}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

TaskMenu.propTypes = {
  taskId: PropTypes.string.isRequired,
};

export default TaskMenu;