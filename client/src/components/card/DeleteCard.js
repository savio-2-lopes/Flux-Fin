import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch } from 'react-redux';
// Material UI 
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// Card e Kambam
import { deleteCard } from '../../actions/kambam';

const DeleteCard = ({ cardId, setOpen, task }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onDeleteCard = async () => {
    dispatch(deleteCard(task._id, cardId));
    setOpenDialog(false);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='contained'
        color='secondary'
        onClick={handleClickOpen}
      >
        Deletar card
      </Button>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{'Deletar card?'}</DialogTitle>
        <DialogActions>
          <Button
            onClick={onDeleteCard}
            variant='contained'
            color='secondary'
            autoFocus
          >
            Deletar
          </Button>

          <Button onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteCard.propTypes = {
  cardId: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default DeleteCard;