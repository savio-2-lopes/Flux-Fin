import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch } from 'react-redux';
// Material UI
import { TextField } from '@material-ui/core';
// Kambam and Card
import { renameKambam } from '../../actions/kambam';

const KambamTitle = ({ kambam }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(kambam.title);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(kambam.title);
  }, [kambam.title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(renameKambam(kambam._id, { title }));
    setEditing(false);
  };

  return !editing ? (
    <h2
      className='board-title'
      onClick={() => setEditing(true)}
    >
      {kambam.title}
    </h2>
  ) : (
    <form
      className='board-title-form'
      onSubmit={(e) => onSubmit(e)}
    >
      <TextField
        variant='outlined'
        required
        value={title}
        size='small'
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
};

KambamTitle.propTypes = {
  kambam: PropTypes.object.isRequired,
};

export default KambamTitle;