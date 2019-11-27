export default {
    formatNewCustomer,
};

function formatNewCustomer(values) {
    return {
        name: values.name || 'Unknown',
        contact: {
            email: values.email || null,
            phone: values.phoneNumber || null,
            preference: values.preference || 'phone',
        },
        payment: values.payment || null,
        hearabout: values.hearabout || null,
        paymentAmount: null,
        schedule: null,
        jobs: [],
        locations: [
            {
                address: {
                    street: values.street,
                    city: values.city,
                    state: values.region,
                    zipcode: values.zipcode,
                },
                primary: true,
                name: `${values.name} Residence`,
            },
        ],
        notes: values.notes || null,
    };
}
