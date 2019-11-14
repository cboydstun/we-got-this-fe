import React from 'react';

const Customer = ({ location }) => {
    console.log(location);

    return (
        <>
            <h1>Customer</h1>
            <div>This is some text</div>
            <p>{location.state && location.state.name}</p>
        </>
    );
};

export default Customer;
