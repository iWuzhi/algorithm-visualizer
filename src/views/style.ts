import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  header: {
    height: 60,
  },

  main: {
    height: 'calc(100% - 60px)',

    '& nav': {
      width: 240,
    },
  },
});
