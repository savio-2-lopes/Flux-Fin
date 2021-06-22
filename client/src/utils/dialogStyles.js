import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: 20,
  },

  moveListTop: {
    display: 'flex',
  },

  moveListBottom: {
    flexDirection: 'column',
    display: 'flex'
  },

  moveListButton: {
    marginTop: 20,
  },
}));

export default useStyles;