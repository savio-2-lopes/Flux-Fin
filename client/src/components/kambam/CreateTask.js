import React, { useRef, useState, useEffect } from 'react';
// Redux
import { useDispatch } from 'react-redux';
// Material UI 
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// Card e Kambam
import { addTask } from '../../actions/kambam';
// Cores customizadas do botão
const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const CreateTask = () => {
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addTask({ title }));
    setTitle('');
  };

  return !adding ? (
    <div className='create-list-button'>
      <ThemeProvider theme={theme}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => setAdding(true)}
        >
          <span style={{ color: "white" }}>
            + Adicionar Task
          </span>
        </Button>
      </ThemeProvider>
    </div>
  ) : (
    <div ref={formRef} className='create-list-form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          variant='outlined'
          fullWidth
          margin='normal'
          required
          label='Insira o título da task'
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <ThemeProvider theme={theme}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
            >
              <span style={{ color: "white" }}>
                Adicionar task
              </span>
            </Button>
          </ThemeProvider>

          <Button
            onClick={() => {
              setAdding(false);
              setTitle('');
            }}
          >
            <CloseIcon />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;