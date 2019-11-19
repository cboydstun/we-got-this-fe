import React, { useState, useEffect } from "react";
import { makeStyles, TextareaAutosize } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { withState } from "../../state";

import { actions } from "../../state/customer/customerActions";
import { Form, Field, withFormik, Formik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles({
  column: {
    display: "flex",
    flexDirection: "column"
  },
  controls: {
    display: "flex",
    justifyContent: "space-between"
  }
});

const CustomerForm = ({ errors, touched, values, status, setFieldValue }) => {
  const [state, setState] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    if (status) {
      setState([...state, status]);
    }
  }, [status, state]);

  console.log("Values: ", values, "Status: ", status);

  return (
    <Form>
      <Grid container spacing={3}>
        <Grid item className={classes.column} xs={6}>
          <Field
            type="text"
            name="name"
            placeholder="Full Name"
            value={values.name}
          />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}

          <Field
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            render={({ field, value, onChange }) => (
              <input
                {...field}
                type="tel"
                placeholder="(713) 264-1320"
                onChange={e => {
                  let formatted = checkPhone(e);
                  setFieldValue("phoneNumber", formatted);
                }}
              />
            )}
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <p className="error">{errors.phoneNumber}</p>
          )}

          <Field
            type="text"
            name="email"
            placeholder="Email"
            value={values.email}
          />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}

          <Field
            type="number"
            name="paymentAmount"
            placeholder="Payment Amount"
            value={values.paymentAmount}
          />
          {touched.paymentAmount && errors.paymentAmount && (
            <p className="error">{errors.paymentAmount}</p>
          )}

          <Field
            component="select"
            className="hearabout-select"
            name="hearabout"
            value={values.hearabout}
          >
            <option>How Did You Hear About Us</option>
            <option value="customer referral">Customer Referral</option>
            <option value="internet">Internet</option>
            <option value="employee referral">Employee Refferal</option>
          </Field>
        </Grid>

        <Grid item className={classes.column} xs={6}>
          <Field
            type="text"
            name="street"
            placeholder="Street"
            value={values.street}
          />
          {touched.street && errors.street && (
            <p className="error">{errors.street}</p>
          )}

          <Field
            type="text"
            name="city"
            placeholder="City"
            value={values.city}
          />
          {touched.city && errors.city && (
            <p className="error">{errors.city}</p>
          )}

          <Field
            type="text"
            name="region"
            placeholder="State"
            value={values.region}
          />
          {touched.region && errors.region && (
            <p className="error">{errors.region}</p>
          )}

          <Field
            type="text"
            name="zipcode"
            placeholder="Zip Code"
            value={values.zipcode}
          />
          {touched.zipcode && errors.state && (
            <p className="error">{errors.zipcode}</p>
          )}

          <Field
            component="select"
            className="Recurrence"
            name="Recurrence"
            value={values.Recurrence}
          >
            <option>Recurrence Level</option>
            <option value="Monthly">Monthly</option>
            <option value="Bi-Weekly">Bi-Weekly</option>
            <option value="Weekly">Weekly</option>
          </Field>

          <textarea
            type="text"
            name="notes"
            placeholder="Special Notes"
            value={values.notes}
          />
          {touched.zipcode && errors.notes && (
            <p className="error">{errors.notes}</p>
          )}

          <div className={classes.controls}>
            {" "}
            <button type="button">Cancel</button>{" "}
            <button type="submit">Submit</button>{" "}
          </div>
        </Grid>
      </Grid>
    </Form>
  );
};

function checkPhone(obj) {
  let str = obj.target.value.replace(/[^0-9]+?/g, "");
  switch (str.length) {
    case 10:
      str =
        "(" +
        str.substr(0, 3) +
        ") " +
        str.substr(3, 3) +
        "-" +
        str.substr(6, 4);
      break;
    default:
      return;
  }
  return str;
}

const CreateCustomerForm = withFormik({
  mapPropsToValues({
    name,
    email,
    phoneNumber,
    street,
    city,
    paymentAmount,
    region,
    zipcode,
    notes,
    state
  }) {

    let initialName = state.customers.currentCustomer.name;
    let initialEmail = state.customers.currentCustomer.contact.email;
    let initialPhone = state.customers.currentCustomer.contact.phone;
    let initialStreet = state.customers.currentCustomer.locations[0].address.street;
    let initialCity = state.customers.currentCustomer.locations[0].address.city;
    let initialZipCode = state.customers.currentCustomer.locations[0].address.zipcode;

    return {
      name: name || state.customers.currentCustomer.name || "",
      email: email || initialEmail,
      phoneNumber: phoneNumber || initialPhone,
      street: street || initialStreet,
      city: city || initialCity,
      paymentAmount: paymentAmount || "",
      region: region || "ID",
      zipcode: zipcode || initialZipCode,
      notes: notes || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Must enter a First Name"),
    phoneNumber: Yup.string().required("Must enter a Phone Number"),
    street: Yup.string().required("Must enter an Address"),
    city: Yup.string().required("Must enter an City"),
    region: Yup.string().required("Must enter a State"),
    zipcode: Yup.number().required("Must enter an Zip"),
    paymentAmount: Yup.number().required("Must enter a Payment Amount")
  }),

  handleSubmit(values, { setStatus, props, resetForm }) {
    actions.addCustomer(props.dispatch, { ...values }).then(res => {
      if (res == true) {
        console.log("redirecting");
      }
    });
    resetForm();
  }
})(CustomerForm);

export default withState(CreateCustomerForm);
