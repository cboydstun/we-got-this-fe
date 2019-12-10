import React from "react";
import { useStateValue } from "../../state";
import { actions } from "../../state/auth/authActions";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";
import Column from "../../components/styles/containers/Column";
import Row from "../../components/styles/containers/Row";
import { makeStyles } from "@material-ui/core/styles";
import images from "../../images/loginPic.png";


const useStyles = makeStyles(theme => ({
    main: {
        border: '1px solid black',
        padding: '0'
    },
    loginImage: {
        backgroundColor: '#2678C0',
    },
    image: {
        width: '770px',
        height: '877px',
        padding: '66px',
    },
    text1: {
        textAlign: 'center',
        margin: 'auto',
        color: '#2678C0',
        fontSize: '50px',
        paddingTop: '203px',
    },
    text2: {
        margin: 'auto',
        color: '#2678C0',
        fontSize: '35px',
    },
    googleLogo: {
        height: '47px',
        width: '50px',
        paddingTop: '3px',
    },
    buttonSignIn: {
        height: '50px',
        width: '240px',
        backgroundColor: 'white',
        margin: 'auto',
        border: '1px solid white'
    },
    flex: {
        display: 'flex',
        border: '1px solid black'
    }

   
}));

const Auth = () => {
  const [{ auth }, dispatch] = useStateValue();
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.main}>
      <Row>
        <Column className={classes.zeroPadding}>
            <div className={classes.loginImage}><img className={classes.image} src={images} /></div>
        </Column>
        <Column>
          <h1 className={classes.text1}>Welcome back!</h1>
          <h2 className={classes.text2}>We know you got this!</h2>
          {auth.loadingUser ? (
            <h4>Loading</h4>
          ) : (
            <h4>{auth.currentUser && auth.currentUser.displayName}</h4>
          )}
          <div className={classes.flex}>
          <img className={classes.googleLogo} src='https://www.sketchappsources.com/resources/source-image/google-g-logo.jpg'></img>
          <button className={classes.buttonSignIn} 
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
          </div>
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
        </Column>
      </Row>
    </div>
  );
};

export default Auth;
