import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  createKambamModal: {
    marginTop: 200,
    width: 400,
  },

  cardModal: {
    width: 800,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 200,
    },
  },

  cardTitle: {
    width: '100%',
  },

  button: {
    marginTop: 10,
    width: 180,
  },

  membersTitle: {
    margin: '20px 0 10px',
  },

  labelTitle: {
    margin: '20px 0 10px',
  },

  colorPicker: {
    minWidth: 212,
  },

  noLabel: {
    width: 100,
  },

  moveCardTitle: {
    marginTop: 20,
  },

  moveCard: {
    flexDirection: 'column',
    display: 'flex',
  },

  moveCardSelect: {
    marginRight: 20,
    marginTop: 10,
    width: 200,
  },

  header: {
    marginBottom: 10,
    marginTop: 10,
  },

  checklistItem: {
    justifyContent: 'space-between',
    margin: '2px 0 5px',
    display: 'flex',
    width: '100%',
  },

  checklistFormLabel: {
    width: '100%',
  },

  itemButtons: {
    display: 'flex',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  itemButton: {
    height: 40,
  },

  checklistBottom: {
    marginTop: 5,
  },

  paper: {
    transform: 'translateX(-50%)',
    flexDirection: 'column',
    position: 'absolute',
    display: 'flex',
    left: '50%',
    [theme.breakpoints.up('md')]: {
      maxHeight: '90vh',
      top: '5%',
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },

    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    boxShadow: theme.shadows[5],
    borderRadius: '0.4rem',
    overflowY: 'auto',
  },

  modalTop: {
    display: 'flex',
  },

  modalSection: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    display: 'flex',
    height: 'auto',
  },

  modalBottomRight: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    display: 'flex',
    marginTop: 20,
  },

  archiveButton: {
    marginBottom: 5,
  },
}));

export default useStyles;