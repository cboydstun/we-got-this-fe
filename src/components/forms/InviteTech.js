import React from 'react';
import { Formik } from "formik";
// import { useForm } from '../hooks/useForm';
// import { inviteTech } from '../state/reducers/techReducer';
import * as Yup from "yup";
import Error from '../Error';
import { TextField } from '@material-ui/core';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Must enter a Name'),
    phone: Yup.number()
        .required('Must enter a Phone Number'),
    address: Yup.string()
        .required('Must enter an Address'),
    email: Yup.string()
        .required('Must enter an Email'),
    notes: Yup.string()
        .max(255, 'Must be shorter than 255')
})


const InviteTech = () => {

    return (
        <Formik
            initialValues={{
                name: '',
                phone: '',
                address: '',
                email: '',
                notes: '',
            }}

            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setSubmitting(true)

                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                    console.log('SS..', setSubmitting)
                }, 500);
            }}>

            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                

                <form className='Form' onSubmit={handleSubmit}>
                    <div className='tech-form-left'>

                        <h1>
                            Invite Tech
                        </h1>

                            <TextField error={touched.name} onChange={handleChange} name='name' value={values.name} onBlur={handleBlur} className={touched.name && errors.name ? 'has-error' : null} label="Full Name" margin="normal" variant="outlined" />
                            <Error touched={touched.name} message={errors.name} />

                        <div>
                            <TextField error={touched.phone} onChange={handleChange} name='phone' value={values.phone} onBlur={handleBlur} className={touched.phone && errors.phone ? 'has-error' : null} label="Phone Number" margin="normal" variant="outlined" />
                            <Error touched={touched.phone} message={errors.phone} />
                        </div>

                        <div>
                            <textarea onChange={handleChange} name='notes' placeholder='Notes' value={values.notes} onBlur={handleBlur} className={touched.notes && errors.notes ? 'has-error' : null} />
                            <Error touched={touched.notes} message={errors.notes} />
                        </div>

                    </div> {/* it-form-top-left end */}
                    <div className='tech-form-right'>

                        <div>
                            <TextField error={touched.email} onChange={handleChange} name='email' value={values.email} onBlur={handleBlur} className={touched.email && errors.email ? 'has-error' : null} label="Email" margin="normal" variant="outlined" />
                            <Error touched={touched.email} message={errors.email} />
                        </div>
                        
                        <div className='tech-buttons'>
                            <button id='tech-cancel'>Cancel</button>
                            <button type='submit' disabled={isSubmitting}>Submit</button>
                        </div> {/* tech-buttons end */}

                    </div> {/* tech-form-right end */}
                </form> /* Form end */
            )}
        </Formik>
    )
}
export default InviteTech;