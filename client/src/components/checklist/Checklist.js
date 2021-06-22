import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// Material UI 
import { FormGroup, FormControl } from '@material-ui/core';
// Card e Kambam
import CreateChecklistItem from './CreateChecklistItem';
import useStyles from '../../utils/modalStyles';
import ChecklistItem from './ChecklistItem';

const Checklist = ({ card }) => {
  const classStyles = useStyles();
  return (
    <Fragment>

      <h3 className={classStyles.header}>
        Checklist
      </h3>

      <FormControl component='fieldset'>
        <FormGroup>
          {card.checklist.map((item) => (
            <ChecklistItem
              key={item._id}
              item={item}
              card={card}
            />
          ))}
        </FormGroup>
      </FormControl>
      <CreateChecklistItem cardId={card._id} />
    </Fragment>
  );
};

Checklist.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Checklist;