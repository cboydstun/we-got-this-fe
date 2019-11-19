import React from "react";
import { Formik } from "formik";
import { actions } from "../../state/auth/authActions";
import { useStateValue } from "../../state";
import * as Yup from "yup";
import Error from "../Error";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Full Name Required"),

  email: Yup.string().required("Email Required"),

  teamAssignment: Yup.string().required("Team Assignment Required")
});

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 225,
  },

  selectEmpty: {
    marginTop: theme.spacing(2),
  },

}));

const InviteTech = () => {
  const [state, dispatch] = useStateValue();
  const [teamAssignment, setTeamAssignment] = React.useState('');
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current);
  }, []);
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        teamAssignment: ""
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        actions.inviteTech(dispatch, values).then(res => {
          console.log("RES...", res);
        });
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
          console.log("SS..", setSubmitting);
        }, 500);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form className="Form" onSubmit={handleSubmit}>
          <h1>Invite Tech</h1>

          <TextField
            error={errors.name && touched.name}
            onChange={handleChange}
            name="name"
            value={values.name}
            onBlur={handleBlur}
            className={touched.name && errors.name ? "has-error" : null}
            label="Full Name"
            margin="normal"
            variant="outlined"
          />
          <Error touched={touched.name} messteamAssignment={errors.name} />

          <TextField
            error={errors.email && touched.email}
            onChange={handleChange}
            name="email"
            value={values.email}
            onBlur={handleBlur}
            className={touched.email && errors.email ? "has-error" : null}
            label="Email"
            margin="normal"
            variant="outlined"
          />
          <Error touched={touched.email} messteamAssignment={errors.email} />

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel className={classes.dropdown} ref={inputLabel} id="demo-simple-select-outlined-label">
              Team Assignment
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={teamAssignment}
              onChange={handleChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Team A</MenuItem>
              <MenuItem value={20}>Team B</MenuItem>
              <MenuItem value={30}>Team C</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </form> /* Form end */
      )}
    </Formik>
  );
};
export default InviteTech;
