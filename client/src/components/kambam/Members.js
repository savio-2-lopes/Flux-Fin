import React, { useState } from 'react';
// Axios
import axios from 'axios';
// Redux
import { useSelector, useDispatch } from 'react-redux';
// Material UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
// Card e Kambam
import { addMember } from '../../actions/kambam';
// import getAvatar from '../../utils/getAvatar'
// Cor customizada do botão
const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const Members = () => {
  const [inviting, setInviting] = useState(false);
  const [user, setUser] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [users, setUsers] = useState([]);
  const kambamMembers = useSelector((state) => state.kambam.kambam.members);
  const searchOptions = users.filter((user) =>
    kambamMembers.find((kambamMember) => kambamMember.user === user._id) ? false : true
  );
  const dispatch = useDispatch();

  const handleInputValue = async (newInputValue) => {
    setInputValue(newInputValue);

    if (newInputValue && newInputValue !== '') {
      const search = (await axios.get(`/users/${newInputValue}`)).data.slice(0, 5);
      setUsers(search && search.length > 0 ? search : []);
    }
  };

  const onSubmit = async () => {
    dispatch(addMember(user._id));
    setUser(null);
    setInputValue('');
    setInviting(false);
  };

  return (
    <div className='board-members-wrapper'>
      <div className='board-members'>
        {kambamMembers.map((member) => {
          return (
            <Tooltip
              title={member.name}
              key={member.user}
            >
              <Avatar
                className='avatar'
                src={member.avatar}
              >
                {/* {getAvatar(member.name)} */}
              </Avatar>
            </Tooltip>
          );
        })}
      </div>

      {!inviting ? (
        <ThemeProvider theme={theme}>
          <Button
            className='invite'
            variant='contained'
            color='primary'
            onClick={() => setInviting(true)}
          >
            <span style={{ color: "white" }}>
              Convite
            </span>
          </Button>
        </ThemeProvider>
      ) : (
        <div className='invite'>
          <Autocomplete
            value={user}
            onChange={(e, newMember) => setUser(newMember)}
            inputValue={inputValue}
            onInputChange={(e, newInputValue) => handleInputValue(newInputValue)}
            options={searchOptions}
            getOptionLabel={(member) => member.email}
            className='search-member'
            renderInput={(params) => (
              <TextField
                {...params}
                helperText='Buscar usuário por email'
                autoFocus
              />
            )}
          />

          <div className='add-member'>
            <ThemeProvider theme={theme}>
              <Button
                disabled={!user}
                variant='contained'
                color='primary'
                onClick={onSubmit}
              >
                <span style={{ color: "white" }}>
                  Adicionar membros
                </span>
              </Button>
            </ThemeProvider>

            <Button
              onClick={() => setInviting(false)}
            >
              <CloseIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;