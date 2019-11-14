import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../../state';

const ServiceWrapper = () => {
    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useStateValue();

    return (
        <div>
            <h2>Service History</h2>
        </div>
    );
};

export default ServiceWrapper;
