import React from 'react';
import { Formik, withFormik, Form, Field } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { withState } from '../state';

const EditCustomer = ({
    errors,
    touched,
    values,
    status,
    userCreated,
    setFieldValue,
    history,
}) => {
    return (
        <Formik style={{ maxWidth: 450 }}>
            {!_.isEmpty(
                _.intersection(Object.keys(touched), Object.keys(errors))
            ) && (
                <div>
                    <p>There's some issues</p>
                    <p>
                        {_.intersection(
                            Object.keys(touched),
                            Object.keys(errors)
                        ).map(key => errors[key])}
                    </p>
                </div>
            )}

            <div>
                <label>
                    Customer Name
                    <Field type="Text" name="name" />
                </label>
            </div>
            <div>
                <label>
                    Customer Phone Number
                    <Field
                        name="phoneNumber"
                        render={({ field, value, onChange }) => (
                            <input
                                {...field}
                                type="tel"
                                placeholder="(713) 264-1320"
                                onChange={e => {
                                    let formatted = checkPhone(e);
                                    setFieldValue('phoneNumber', formatted);
                                }}
                            />
                        )}
                    />
                </label>
            </div>
            <div>
                <label>
                    Customer Email
                    <Field type="email" name="email" />
                </label>
            </div>

            <button type="submit">Submit</button>
            <button
                onClick={() => {
                    history.push('/');
                }}
            >
                Cancel
            </button>
        </Formik>
    );
};

function checkPhone(obj) {
    let str = obj.target.value.replace(/[^0-9]+?/g, '');
    switch (str.length) {
        case 10:
            str =
                '(' +
                str.substr(0, 3) +
                ') ' +
                str.substr(3, 3) +
                '-' +
                str.substr(6, 4);
            break;
        default:
            return;
    }
    return str;
}

const EditCustomerForm = withFormik({
    mapPropsToValues: ({ name, phoneNumber, email }) => {
        return {
            name: name || '',
            phoneNumber: phoneNumber || '',
            email: email || '',
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required('You must have a Customer Name')
            .min(4, 'Your customer name cannot be less than 3 letters.'),
        phoneNumber: Yup.string()
            .required('You must provide a customer phone number')
            .min(10, 'Your phone must be at least 10 digits'),
        email: Yup.string()
            .email('The email provided is not valid')
            .required('You must provide an email'),
    }),

    handleSubmit: function(values, { props, resetForm }) {
        console.log('Submitting');
    },
})(EditCustomer);

export default withState(withRouter(EditCustomerForm));
