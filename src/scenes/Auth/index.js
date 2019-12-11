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
        // border: '1px solid black',
        padding: '0',
        height: '100%'
    },
    loginImage: {
        backgroundColor: '#2678C0',
    },
    image: {
        width: '765px',
        height: '740px',
        padding: '167px',
    },
    text1: {
        textAlign: 'center',
        margin: 'auto',
        color: '#2678C0',
        fontSize: '50px',
        paddingTop: '221px',
    },
    text2: {
        margin: 'auto',
        color: '#2678C0',
        fontSize: '35px',
        marginBottom: '50px',
        fontWeight: '100'
    },
    googleLogo: {
        height: '45px',
        width: '50px',
        paddingTop: '7px',
    },
    buttonSignIn: {
        height: '50px',
        width: '240px',
        backgroundColor: 'white',
        border: '1px solid white',
        borderRadius: '4px',
        fontSize: '20px',
        padding: '0',
        fontWeight: 'bolder',
        color: 'grey',
        cursor: 'pointer',
        outline: 'none',
    },
    buttonRegister: {
        border: '1px solid white',
        textDecoration: 'underline',
        cursor: 'pointer',
        color: '#2678C0',
        fontSize: '1.0rem'
    },
    flex: {
        display: 'flex',
        border: '5px solid #C5D3F3',
        margin: 'auto',
        cursor: 'pointer',
        marginBottom: '35px',
        padding: '10px',
    },
    flex2: {
        display: 'flex',
        margin: 'auto',
        color: '#2678C0',
        fontSize: '1.0rem'
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
          <div className={classes.flex} onClick={async () => {
              let result = await actions.login(dispatch);
              console.log(result);
              if (result == true) {
                history.push(routes.HOME);
              }
            }}>
          <img className={classes.googleLogo} src='https://www.sketchappsources.com/resources/source-image/google-g-logo.jpg'></img>
          <button className={classes.buttonSignIn} 
            
          >
            Sign In With Google
          </button>
          </div>
          <div className={classes.flex2}>
          <p>Don't have an account?</p>
          <button className={classes.buttonRegister}
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
        </Column>
      </Row>
    </div>
  );

};

export default Auth;
