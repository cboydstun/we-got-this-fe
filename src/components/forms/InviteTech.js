import React from 'react';
import { Formik } from "formik";
// import { useForm } from '../hooks/useForm';
// import { inviteTech } from '../state/reducers/techReducer';
import * as Yup from "yup";
import Error from '../Error';
import { TextField } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Full Name Required'),

    email: Yup.string()
        .required('Email Required'),

    phone: Yup.number()
        .required('Phone Number Required'),

    notes: Yup.string()
        .max(255, 'Text in this field must be shorter than 255 characters')
})


const InviteTech = () => {

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                phone: '',
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

                        <h1>
                            Invite Tech
                        </h1>

                            <TextField error={errors.name && touched.name} onChange={handleChange} name='name' value={values.name} onBlur={handleBlur} className={touched.name && errors.name ? 'has-error' : null} label="Full Name" margin="normal" variant="outlined" />
                            <Error touched={touched.name} message={errors.name} />

                            <TextField error={errors.email && touched.email} onChange={handleChange} name='email' value={values.email} onBlur={handleBlur} className={touched.email && errors.email ? 'has-error' : null} label="Email" margin="normal" variant="outlined" />
                            <Error touched={touched.email} message={errors.email} />

                            <TextField error={errors.phone && touched.phone} onChange={handleChange} name='phone' value={values.phone} onBlur={handleBlur} className={touched.phone && errors.phone ? 'has-error' : null} label="Phone Number" margin="normal" variant="outlined" />
                            <Error touched={touched.phone} message={errors.phone} />

                            <TextareaAutosize onChange={handleChange} name='notes' placeholder='Notes' value={values.notes} onBlur={handleBlur} className={touched.notes && errors.notes ? 'has-error' : null} />
                            <Error touched={touched.notes} message={errors.notes} />

                        <div className='tech-buttons'>
                            <button id='tech-cancel'>Cancel</button>
                            <button type='submit' disabled={isSubmitting}>Submit</button>
                        </div> 

                </form> /* Form end */
            )}
        </Formik>
    )
}
export default InviteTech;