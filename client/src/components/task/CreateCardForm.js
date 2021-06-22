import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addCard } from '../../actions/kambam';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#82c595', },
  },
});

const CreateCardForm = ({ taskId, setAdding }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const formRef = useRef(null);
  useEffect(() => {
    formRef && formRef.current && formRef.current.scrollIntoView();
  }, [title]);

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(addCard({ title, taskId }));
    setTitle('');
  };

  return (
    <form
      ref={formRef}
      className='create-card-form'
      onSubmit={(e) => onSubmit(e)}
    >
      <Card>
        <CardContent className='card-edit-content'>
          <TextField
            margin='normal'
            fullWidth
            multiline
            required
            label='Insira um título para este card'
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Entre' && onSubmit(e)}
          />
        </CardContent>
      </Card>

      <div className='card-actions'>
        <ThemeProvider theme={theme}>
          <Button
            type='submit'
            variant='contained'
            color='primary'
          >
            <span style={{ color: "white" }}>
              Adicionar Card
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
  );
};

CreateCardForm.propTypes = {
  taskId: PropTypes.string.isRequired,
  setAdding: PropTypes.func.isRequired,
};

export default CreateCardForm;