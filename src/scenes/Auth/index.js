import React from 'react';
import { useStateValue } from '../../state';
import { actions } from '../../state/auth/authActions';
import { useHistory } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { makeStyles } from '@material-ui/core/styles';
import images from '../../images/loginPic.png';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#2678C0',
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      fontSize: '18px',
    },
  },
  container: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  root2: {
    color: '#2678C0',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px',
    },
  },
  root4: {
    borderRadius: 4,
    boxShadow: 10,
  },
  imgContainer: {
    backgroundColor: '#2678C0',
    flex: 1,
  },
  img: {
    backgroundImage: `url(${images})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundAttachment: 'fixed',
    width: '100%',
    height: `calc(100vh - ${theme.spacing(4)}px)`,
    [theme.breakpoints.down('xs')]: {
      width: '90vw',
      height: '50vh',
    },
  },
  loginContainer: {
    flex: 1,
  },
}));

const Auth = () => {
  const [{ auth }, dispatch] = useStateValue();
  const history = useHistory();

  const classes = useStyles();

  return (
    <Grid
      container
      lg={2}
      spacing={2}
      direction="row"
      justify="space-around"
      alignItems="center"
      className={classes.container}
    >
      <Grid item className={classes.imgContainer}>
        <div className={classes.img}></div>
      </Grid>
      <Grid
        container
        item
        justify="center"
        alignItems="center"
        className={classes.loginContainer}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 className={classes.root}>Welcome back!</h1>
          <h2 className={classes.root2}>We know you got this!</h2>
          {auth.loadingUser ? (
            <h4>Loading</h4>
          ) : (
              <h4>
                {auth.currentUser && auth.currentUser.displayName}
              </h4>
            )}
          <button
            className={classes.root4}
            onClick={async () => {
              let result = await actions.login(dispatch);
              console.log(result);
              if (result == true) {
                history.push(routes.HOME);
              }
            }}
          >
            Sign In With Google
                    </button>
          <div>Don't have an account?</div>
          <button
            onClick={async () => {
              let result = await actions.login(dispatch);
              console.log(result);
              if (result == true) {
                history.push(routes.AUTH_REGISTER_COMPANY);
              }
            }}
          >
            Register With Google
                    </button>
        </div>
      </Grid>
    </Grid>
  );
};

export default Auth;