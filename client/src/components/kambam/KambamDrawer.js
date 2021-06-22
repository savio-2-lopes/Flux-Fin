import React, { useState } from 'react';
// Redux
import { useSelector } from 'react-redux';
// Moment
import Moment from 'react-moment';
// Material UI
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArchiveIcon from '@material-ui/icons/Archive';
import ListItem from '@material-ui/core/ListItem';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// Card e Kambam
import useStyles from '../../utils/drawerStyles';
import ArchivedTasks from './ArchivedTasks';
import ArchivedCards from './ArchivedCards';
// Cor customizada do botão
const theme = createMuiTheme({
  palette: { primary: { main: '#82c595', }, },
});

const KambamDrawer = () => {
  const classStyles = useStyles();
  const [open, setOpen] = useState(false);
  const [viewingArchivedTasks, setViewingArchivedTasks] = useState(false);
  const [viewingArchivedCards, setViewingArchivedCards] = useState(false);
  const [activityChunks, setActivityChunks] = useState(1);
  const activity = useSelector((state) => state.kambam.kambam.activity);

  const handleClose = () => {
    setOpen(false);
    setActivityChunks(1);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          onClick={() => setOpen(true)}
          variant='contained'
          color='primary'
          className={open ? classStyles.hide : classStyles.showMenuButton}
        >
          <MoreHorizIcon
            style={{ color: "white" }}
            fontSize='small'
            color='white'
          />
          <span style={{ color: "white" }}>
            Exibir menu
          </span>
        </Button>
      </ThemeProvider>

      <Drawer
        className={open ? classStyles.drawer : classStyles.hide}
        variant='persistent'
        anchor='right'
        open={open}
        classStyles={{ paper: classStyles.drawerPaper, }}
      >
        {!viewingArchivedTasks && !viewingArchivedCards ? (
          <div>
            <div className={classStyles.drawerHeader}>
              <h3>Menu</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>

            <Divider />

            <List>
              <ListItem
                button
                onClick={() => setViewingArchivedTasks(true)}
              >
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText
                  primary={'Tasks arquivadas'}
                />
              </ListItem>

              <ListItem
                button
                onClick={() => setViewingArchivedCards(true)}
              >
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText
                  primary={'Cards arquivadas'}
                />
              </ListItem>
            </List>

            <Divider />

            <div className={classStyles.activityTitle}>
              <h3>Atividades</h3>
            </div>

            <List>
              {activity.slice(0, activityChunks * 10).map((activity) => (
                <ListItem key={activity._id}>
                  <ListItemText
                    primary={activity.text}
                    secondary={<Moment fromNow>{activity.date}</Moment>}
                  />
                </ListItem>
              ))}
            </List>

            <div className={classStyles.viewMoreActivityButton}>
              <Button
                disabled={activityChunks * 10 > activity.length}
                onClick={() => setActivityChunks(activityChunks + 1)}
              >
                Ver mais atividades
              </Button>
            </div>
          </div>
        ) : viewingArchivedTasks ? (

          <div>
            <div className={classStyles.drawerHeader}>
              <Button
                onClick={() => setViewingArchivedTasks(false)}
              >
                <ChevronLeftIcon />
              </Button>

              <h3>Kanbans arquivados</h3>

              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>

            <Divider />

            <ArchivedTasks />
          </div>
        ) : (
          <div>
            <div className={classStyles.drawerHeader}>
              <Button
                onClick={() => setViewingArchivedCards(false)}
              >
                <ChevronLeftIcon />
              </Button>

              <h3>Tasks arquivados</h3>

              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>

            <Divider />

            <ArchivedCards />
          </div>
        )}
        <Divider />
      </Drawer>
    </div>
  );
};

export default KambamDrawer;