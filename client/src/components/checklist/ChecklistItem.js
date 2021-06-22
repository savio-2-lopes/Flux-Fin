import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useDispatch } from 'react-redux';
// Material UI 
import { Checkbox, withStyles, FormControlLabel } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
// Card e Kambam
import {
  completeChecklistItem,
  editChecklistItem,
  deleteChecklistItem,
} from '../../actions/kambam';
import useStyles from '../../utils/modalStyles';
// Cores customizadas de checkbox
const GreenCheckbox = withStyles({
  root: { color: green[400], '&$checked': { color: green[600], }, },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);
// Cores customizadas dos botões
const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const ChecklistItem = ({ item, card }) => {
  const classStyles = useStyles();
  const [text, setText] = useState(item.text);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setText(item.text);
  }, [item.text]);

  const onEdit = async (e) => {
    e.preventDefault();
    dispatch(editChecklistItem(card._id, item._id, { text }));
    setEditing(false);
  };

  const onComplete = async (e) => {
    dispatch(
      completeChecklistItem({
        cardId: card._id,
        complete: e.target.checked,
        itemId: item._id,
      })
    );
  };

  const onDelete = async (e) => {
    dispatch(deleteChecklistItem(card._id, item._id));
  };

  return (
    <div className={classStyles.checklistItem}>
      {editing ? (
        <form onSubmit={(e) => onEdit(e)} className={classStyles.checklistFormLabel}>
          <TextField
            variant='filled'
            fullWidth
            multiline
            required
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onEdit(e)}
          />
          <div>
            <ThemeProvider theme={theme}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
              >
                Salvar
              </Button>
            </ThemeProvider>

            <Button
              onClick={() => {
                setEditing(false);
                setText(item.text);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </form>
      ) : (
        <Fragment>
          <FormControlLabel
            control={
              <GreenCheckbox
                checked={
                  card.checklist.find((cardItem) => cardItem._id === item._id).complete
                }
                onChange={onComplete}
                name={item._id}
              />
            }
            label={item.text}
            className={classStyles.checklistFormLabel}
          />
          <div className={classStyles.itemButtons}>
            <Button
              className={classStyles.itemButton}
              onClick={() => setEditing(true)}
            >
              <EditIcon />
            </Button>

            <Button
              color='secondary'
              className={classStyles.itemButton}
              onClick={onDelete}
            >
              <HighlightOffIcon />
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

ChecklistItem.propTypes = {
  item: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
};

export default ChecklistItem;