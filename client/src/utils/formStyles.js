import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'column',
    background: '#82c595',
    alignItems: 'center',
    maxWidth: '100vw',
    height: '100vh',
    display: 'flex',
    padding: '20px',
  },

  paper: {
    marginTop: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
    background: 'white',
    maxWidth: '500px',
    display: 'flex',
    padding: '20px',
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default useStyles;