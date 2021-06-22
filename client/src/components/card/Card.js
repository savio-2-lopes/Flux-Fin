import React, { Fragment, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Drag and Drop
import { Draggable } from 'react-beautiful-dnd';
// Material UI 
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { TextField, CardContent, Button, Avatar, Tooltip } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import SubjectIcon from '@material-ui/icons/Subject';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import CardMUI from '@material-ui/core/Card';
// Card e Kambam
import { getCard, editCard } from '../../actions/kambam';
import CardModal from './CardModal';
// Cor customizada do botão
const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const Card = ({ cardId, task, index }) => {
  const [editing, setEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [title, setTitle] = useState('');
  const [height, setHeight] = useState(0);
  const [completeItems, setCompleteItems] = useState(0);
  const cardRef = useRef(null);
  const card = useSelector((state) =>
    state.kambam.kambam.cardObjects.find((object) => object._id === cardId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCard(cardId));
  }, [cardId, dispatch]);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      card.checklist &&
        setCompleteItems(
          card.checklist.reduce(
            (completed, item) => (completed += item.complete ? 1 : 0),
            0
          )
        );
    }
  }, [card]);

  useEffect(() => {
    cardRef && cardRef.current && setHeight(cardRef.current.clientHeight);
  }, [task, card, cardRef]);

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title }));
    setEditing(false);
    setMouseOver(false);
  };

  return !card || (card && card.archived) ? (
    ''
  ) : (
    <Fragment>
      <CardModal
        cardId={cardId}
        open={openModal}
        setOpen={setOpenModal}
        card={card}
        task={task}
      />
      {!editing ? (
        <Draggable draggableId={cardId} index={index}>
          {(provided) => (
            <CardMUI
              className={`card ${mouseOver && !editing ? 'mouse-over' : ''}`}
              onMouseOver={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {mouseOver && !editing && (
                <Button
                  style={{
                    position: 'absolute',
                    bottom: height - 40,
                    left: '180px',
                    zIndex: 1,
                  }}
                  onClick={() => setEditing(true)}
                >
                  <EditIcon fontSize='small' />
                </Button>
              )}
              <CardContent
                onClick={() => {
                  setOpenModal(true);
                  setMouseOver(false);
                }}
                ref={cardRef}
              >
                {card.label && card.label !== 'none' && (
                  <div className='card-label' style={{ backgroundColor: card.label }} />
                )}
                <p>{card.title}</p>
                <div className='card-bottom'>
                  <div className='card-bottom-left'>
                    {card.description && (
                      <SubjectIcon className='description-indicator' fontSize='small' />
                    )}
                    {card.checklist && card.checklist.length > 0 && (
                      <div
                        className={`checklist-indicator ${completeItems === card.checklist.length
                          ? 'completed-checklist-indicator'
                          : ''
                          }`}
                      >
                        <AssignmentTurnedInIcon
                          fontSize='small'
                          className='checklist-indicator-icon'
                        />
                        {completeItems}/{card.checklist.length}
                      </div>
                    )}
                  </div>

                  <div className='card-member-avatars'>
                    {card.members.map((member) => {
                      return (
                        <Tooltip
                          title={member.name}
                          key={member.user}
                        >
                          <Avatar
                            className='avatar'
                            src={member.avatar}
                          />
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </CardMUI>
          )}
        </Draggable>
      ) : (
        <form className='create-card-form' onSubmit={(e) => onSubmitEdit(e)}>

          <CardMUI>
            <CardContent className='card-edit-content'>
              <TextField
                margin='normal'
                fullWidth
                multiline
                required
                label="Edite o título deste card"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onSubmitEdit(e)}
              />
            </CardContent>
          </CardMUI>

          <div className='card-actions'>
            <ThemeProvider theme={theme}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
              >
                <span style={{ color: "white" }}>
                  Salvar
                </span>
              </Button>
            </ThemeProvider>

            <Button
              onClick={() => {
                setEditing(false);
                setMouseOver(false);
                setTitle(card.title);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </form>
      )
      }
    </Fragment >
  );
};

Card.propTypes = {
  cardId: PropTypes.string.isRequired,
  task: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;