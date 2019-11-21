import React, { useState } from 'react';
import { useStateValue, useService } from '../../state';
import { useForm } from '../../hooks/useForm';
import UserList from '../UserList';
import service from '../../state/team/teamService';
import teamService from '../../state/team/teamService';

const CreateTeamForm = () => {
    const [, dispatch] = useStateValue();
    const server = useService(teamService);
    const [techs, setTechs] = useState([]);
    const submitForm = values => {
        service.createTeam({
            name: values.name,
            users: techs.map(tech => tech.email),
        });
    };

    const [values, handleChange, handleSubmit] = useForm(
        {
            name: '',
        },
        submitForm
    );

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
            <UserList
                ids={['cHKisdggmrvFxJIzYumv', 'dksyVFiZr0sSIMf3B28G', 'gw4DejkeoyhalshcX4HZ']}
                handleSelectedUsers={setTechs}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateTeamForm;