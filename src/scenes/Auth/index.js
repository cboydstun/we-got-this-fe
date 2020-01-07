import React from 'react';
import {useStateValue} from '../../state';
import {actions} from '../../state/auth/authActions';
import {useHistory} from 'react-router-dom';
import {routes} from '../../constants/routes';
import {makeStyles} from '@material-ui/core/styles';
import images from '../../images/loginPic.png';
import {Grid} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
	root: {
		color: '#2678C0',
		fontWeight: 'bold',
		[theme.breakpoints.down('xs')]: {
			fontSize: '18px',
		},
	},
	root2: {
		color: '#2678C0',
		[theme.breakpoints.down('xs')]: {
			fontSize: '14px',
		},
	},
	buttonSignIn: {
		margin: '20px 0',
	},
}));
const Auth = () => {
	const [, dispatch] = useStateValue();
	const history = useHistory();

	const classes = useStyles();

	return (
		<Grid
			container
			lg={2}
			spacing={2}
			direction='column'
			justify='center'
			alignItems='center'
		>
			<h1 className={classes.root}>Welcome back!</h1>
			<h2 className={classes.root2}>We know you got this!</h2>
			<button
				className={classes.buttonSignIn}
				onClick={async () => {
					let result = await actions.login(dispatch);
					console.log(result);
					if (result == true) {
						setTimeout(() => {
							history.push(routes.HOME);
						}, 200);
					}
				}}
			>
				Sign In With Google
			</button>

			<p style={{maxWidth: '300px'}}>
				If this is your first time logging in, make sure an admin of We
				Got This has added you as a user
			</p>
		</Grid>
	);
};

export default Auth;
