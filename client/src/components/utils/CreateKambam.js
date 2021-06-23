import React, { useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
// Router
import { withRouter } from 'react-router-dom';
// Material UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// Kambam e Modal
import { addKambam } from '../../actions/kambam';
import useStyles from '../../utils/modalStyles';
// Cores customizadas do botão
const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const CreateKambam = ({ history }) => {
  const classStyles = useStyles();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addKambam({ title }, history));
  };

  const body = (
    <div className={`${classStyles.paper} ${classStyles.createKambamModal}`}>
      <div className={classStyles.modalTop}>
        <h3 style={{ color: "#82c595" }}>Criar kambam</h3>
        <Button onClick={() => setOpen(false)}></Button>
      </div>

      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          label='Adicionar kambam'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <ThemeProvider theme={theme}>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color="primary"
          >
            <span style={{ color: "white" }}>
              Criar kambam
            </span>
          </Button>
        </ThemeProvider>
      </form>
    </div>
  );

  return (
    <div>
      <button
        className='board-card create-board-card'
        onClick={() => setOpen(true)}
      >
        Criar novo kambam
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        {body}
      </Modal>
    </div>
  );
};

export default withRouter(CreateKambam);