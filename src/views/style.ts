import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  header: {
    height: 60,
    backgroundColor: '#000',
  },

  main: {
    display: 'flex',
    height: 'calc(100% - 60px)',

    '& nav': {
      width: 240,
      backgroundColor: '#333',
    },

    '& section': {
      flexGrow: 2,
      display: 'flex',
    },
  },

  visualizer: {
    flexGrow: 2,
  },
  code: {
    flexGrow: 2,
    backgroundColor: '#eee',
  },
});
