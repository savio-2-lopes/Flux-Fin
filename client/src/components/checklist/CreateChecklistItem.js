import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch } from 'react-redux';
// Material UI 
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from '../../utils/modalStyles';
// Card e Kambam
import { addChecklistItem } from '../../actions/kambam';
// Cores customizadas do botão
const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const CreateChecklistItem = ({ cardId }) => {
  const classStyles = useStyles();
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addChecklistItem(cardId, { text }));
    setText('');
  };

  return !adding ? (
    <div className={classStyles.checklistBottom}>
      <ThemeProvider theme={theme}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setAdding(true)}
        >
          <span style={{ color: "white" }}>
            + Adicionar item
          </span>
        </Button>
      </ThemeProvider>
    </div>
  ) : (
    <div className={classStyles.checklistBottom}>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='filled'
          fullWidth
          multiline
          required
          label='Adicionar'
          autoFocus
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSubmit(e)}
        />
        <div>
          <ThemeProvider theme={theme}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
            >
              <span style={{ color: "white" }}>
                Adicionar
              </span>
            </Button>
          </ThemeProvider>

          <Button
            onClick={() => {
              setAdding(false);
              setText('');
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

CreateChecklistItem.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default CreateChecklistItem;