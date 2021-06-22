import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Material UI 
import { Checkbox, withStyles, FormGroup, FormControlLabel, FormControl } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
// Card e Kambam
import { addCardMember } from '../../actions/kambam';
import useStyles from '../../utils/modalStyles';

const CardMembers = ({ card }) => {
  const classStyles = useStyles();
  const kambamMembers = useSelector((state) => state.kambam.kambam.members);
  const members = card.members.map((member) => member.user);
  const dispatch = useDispatch();

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  return (
    <div>
      <h3 className={classStyles.membersTitle}>
        Membros
      </h3>
      <FormControl component='fieldset'>
        <FormGroup>
          {kambamMembers.map((member) => (
            <FormControlLabel
              key={member.user}
              control={
                <GreenCheckbox
                  checked={members.indexOf(member.user) !== -1}
                  onChange={async (e) =>
                    dispatch(
                      addCardMember({
                        add: e.target.checked,
                        cardId: card._id,
                        userId: e.target.name,
                      })
                    )
                  }
                  name={member.user}
                />
              }
              label={member.name}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
};

CardMembers.propTypes = {
  card: PropTypes.object.isRequired,
};

export default CardMembers;