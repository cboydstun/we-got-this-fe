import React from 'react';
import { useForm } from '../hooks/useForm';
import UserList from './UserList';

const CreateTeamForm = () => {
    const submitForm = values => {
        console.log(values);
    };

    const [values, handleChange, handleSubmit] = useForm(
        {
            name: '',
        },
        submitForm
    );

    console.log('values are', values)

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Team</h1>
            <label htmlFor="name">Team Name</label>
            <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
            />
            <UserList ids={['1QDmGsLpzHOOX4W46aaa']} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateTeamForm;