import React, { useState, useEffect } from 'react';
import { GithubPicker } from 'react-color';
import PropTypes from 'prop-types';
// Redux
import { useDispatch } from 'react-redux';
// Material UI 
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// Card e Kambam
import MoveCard from './MoveCard';
import DeleteCard from './DeleteCard';
import CardMembers from './CardMembers';
import Checklist from '../checklist/Checklist';
import useStyles from '../../utils/modalStyles';
import { editCard, archiveCard } from '../../actions/kambam';
// Cor customizada do botão
const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const CardModal = ({ cardId, open, setOpen, card, task }) => {
  const classStyles = useStyles();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title, description }));
  };

  const onArchiveCard = async () => {
    dispatch(archiveCard(cardId, true));
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className={`${classStyles.paper} ${classStyles.cardModal}`}>
        <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
          <div className={classStyles.modalTop}>

            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              multiline
              label='Titulo'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onTitleDescriptionSubmit(e)}
              className={classStyles.cardTitle}
            />
            <Button onClick={() => setOpen(false)}>
              <CloseIcon />
            </Button>
          </div>

          <TextField
            variant='outlined'
            margin='normal'
            fullWidth
            multiline
            label='Descrição'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <ThemeProvider theme={theme}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={
                title === card.title &&
                (description === card.description ||
                  (description === '' && !card.description))
              }
              className={classStyles.button}
            >
              <span style={{ color: "white" }}>
                Salvar
              </span>
            </Button>
          </ThemeProvider>
        </form>

        <div className={classStyles.modalSection}>
          <CardMembers card={card} />
          <div>
            <h3 className={classStyles.labelTitle}>Cores</h3>
            <GithubPicker
              className={classStyles.colorPicker}
              onChange={async (color) => dispatch(editCard(cardId, { label: color.hex }))}
            />
            <Button
              className={classStyles.noLabel}
              variant='outlined'
              onClick={async () => dispatch(editCard(cardId, { label: 'none' }))}
            >
              Sem cores
            </Button>
          </div>
        </div>

        <Checklist card={card} />
        <div className={classStyles.modalSection}>
          <MoveCard
            cardId={cardId}
            setOpen={setOpen}
            thisTask={task}
          />
          <div className={classStyles.modalBottomRight}>
            <Button
              variant='contained'
              className={classStyles.archiveButton}
              onClick={onArchiveCard}
            >
              Arquivar card
            </Button>

            <DeleteCard
              cardId={cardId}
              setOpen={setOpen}
              task={task}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

CardModal.propTypes = {
  cardId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
};

export default CardModal;