import React from 'react';
import { useForm } from '../hooks/useForm';
import { inviteTech } from '../state/reducers/techReducer';


const InviteTech = () => {

    const submitForm = values => {
        inviteTech(values);
    };

const [values, handleChange, handleSubmit] = useForm(
  {
    name: '',
    phone: '',
    address: '',
    email: '',
    type: ''
        },
        submitForm 
    );

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} name='name' placeholder='name'/>
                <input onChange={handleChange} name='phone' placeholder='phone'/>
                <input onChange={handleChange} name='address'placeholder='address'/>
                <input onChange={handleChange} name='email' placeholder='email'/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default InviteTech;