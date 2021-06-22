import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { renameTask } from '../../actions/kambam';
import { TextField } from '@material-ui/core';

const TaskTitle = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const dispatch = useDispatch();
  useEffect(() => {
    setTitle(task.title);
  }, [task.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameTask(task._id, { title }));
    setEditing(false);
  };

  return !editing ? (
    <h3
      className='list-title'
      onClick={() => setEditing(true)}
    >
      {task.title}
    </h3>
  ) : (
    <form onSubmit={(e) => onSubmit(e)}>
      <TextField
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

TaskTitle.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskTitle;