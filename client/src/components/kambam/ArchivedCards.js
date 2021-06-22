import React from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Material UI 
import { Card, List, ListItem, CardContent, Button } from '@material-ui/core';
// Card e Kambam
import { archiveCard, deleteCard } from '../../actions/kambam';

const ArchivedCards = () => {
  const cards = useSelector((state) => state.kambam.kambam.cardObjects);
  const tasks = useSelector((state) => state.kambam.kambam.taskObjects);
  const dispatch = useDispatch();

  const onDelete = async (taskId, cardId) => {
    dispatch(deleteCard(taskId, cardId));
  };

  const onSendBack = async (cardId) => {
    dispatch(archiveCard(cardId, false));
  };

  return (
    <div>
      <List>
        {cards
          .filter((card) => card.archived)
          .map((card, index) => (
            <ListItem key={index} className='archived-card'>
              <Card>
                <CardContent>{card.title}</CardContent>
              </Card>

              <div>
                <Button
                  color='secondary'
                  onClick={() =>
                    onDelete(
                      tasks.find((task) => task.cards.includes(card._id))._id,
                      card._id
                    )
                  }
                >
                  Deletar Tasks
                </Button>

                <Button
                  onClick={() => onSendBack(card._id)}
                >
                  Mover para Kanbam
                </Button>
              </div>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default ArchivedCards;