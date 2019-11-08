import React from 'react';
import { Formik } from "formik";
import { useForm } from '../hooks/useForm';
import { inviteTech } from '../state/reducers/techReducer';


const InviteTech = () => {

    const submitForm = values => {
        inviteTech(values);
    };

const [values, handleChange, handleSubmit] = useForm(
  {
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    notes: '',
    city: '',
    zip:''
        },
        submitForm 
    );

    return (
        <Formik initialValues={{ 
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    email: '',
    notes: '',
    city: '',
    zip:'' 
}}>
        {({values, errors, touched, handleChange, handleBlur}) => (
         <form onSubmit={handleSubmit}>
             <input onChange={handleChange} name='firstName' placeholder='firstName'/>
             <input onChange={handleChange} name='lastName' placeholder='lastName'/>
             <input onChange={handleChange} name='phone' placeholder='phone'/>
             <input onChange={handleChange} name='address'placeholder='address'/>
             <input onChange={handleChange} name='city'placeholder='city'/>
             <input onChange={handleChange} name='state'placeholder='state'/>
             <input onChange={handleChange} name='email' placeholder='email'/>
             <input onChange={handleChange} name='zip' placeholder='zip'/>
             <input onChange={handleChange} name='notes' placeholder='notes'/>
             <button type='submit'>Submit</button>
         </form>
        )}
        </Formik>
    )
}
export default InviteTech;