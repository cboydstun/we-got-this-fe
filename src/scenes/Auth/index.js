import React from "react";
import { useStateValue } from "../../state";
import { actions } from "../../state/auth/authActions";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants/routes";
import Column from "../../components/styles/containers/Column";
import Row from "../../components/styles/containers/Row";
import { makeStyles } from "@material-ui/core/styles";
import images from "../../images/loginPic.png";

const useStyles = makeStyles({
  root: props => ({
    color: props.color,
    fontWeight: props.fontWeight
  }),

  root2: {
    color: props => props.color
  },

  root3: {
    backgroundColor: props => props.backgroundColor,
  },

  root4: {
      borderRadius: props => props.borderRadius,
      boxShadow: props => props.boxShadow
  }
});

const Auth = () => {
  const [{ auth }, dispatch] = useStateValue();
  const history = useHistory();
  const props = { color: "#2678C0", fontWeight: "bold", backgroundColor: "#2678C0", borderRadius: "4px", backgroundSize: "100%", boxShadow: "10px" };
  const classes = useStyles(props);

  return (
    <>
      <Row>
        <Column>
            <div className={`${classes.root3}`}><img src={images} /></div>
        </Column>
        <Column justify="center" align="center" padding={20}>
          <h1 className={`${classes.root}`}>Welcome back!</h1>
          <h2 className={`${classes.root2}`}>We know you got this!</h2>
          {auth.loadingUser ? (
            <h4>Loading</h4>
          ) : (
            <h4>{auth.currentUser && auth.currentUser.displayName}</h4>
          )}
          <button className={`${classes.root4}`}
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
        </Column>
      </Row>
    </>
  );
};

export default Auth;
