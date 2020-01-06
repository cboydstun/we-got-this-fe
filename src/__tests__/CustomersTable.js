import React, {useState} from 'react';
import {render, fireEvent} from 'providers';
import CustomerTable from '../scenes/Customers/components/Table';

const customers = [
	{
		img:
			'https://news.artnet.com/app/news-upload/2015/03/2B153A81-B28C-F6E3-B8426862A893A8B9-1024x608.jpg',
		name: 'Drake',
		contact: {
			phone: '(832) 832-1902',
		},
		locations: [
			{
				address: {
					street: 'My Street',
					city: 'Houston',
					state: 'TX',
					zipcode: 77077,
				},
			},
		],
		type: 'Unknown',
	},
	{
		img:
			'https://news.artnet.com/app/news-upload/2015/03/2B153A81-B28C-F6E3-B8426862A893A8B9-1024x608.jpg',
		name: 'Brittany',
		contact: {
			phone: '(123) 456-7891',
		},
		locations: [
			{
				address: {
					street: 'Bahamas',
					city: 'Bamaica',
					state: 'AL',
					zipcode: 18988,
				},
			},
		],
		type: 'Recurring',
	},
];

jest.mock('../state/customer/customerActions', () => {
	return {
		setCurrentCustomer: jest.fn((dispatch, customer) => null),
	};
});

const MockCustomers = () => {
	const [order, setOrder] = useState('desc');
	const [orderBy, setOrderBy] = useState('name');

	const handleRequestSort = (event, property) => {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	};

	return (
		<CustomerTable
			customers={customers}
			onRequestSort={handleRequestSort}
			orderBy={orderBy}
			order={order}
		/>
	);
};

test('Table Renders and sorts properly', () => {
	const {getByText, queryAllByTestId} = render(<MockCustomers />);
	const nameHeader = getByText('Customer Name');
	const names = queryAllByTestId('names').map(node => node.textContent);

	expect(names).toStrictEqual(['Drake', 'Brittany']);

	fireEvent.click(nameHeader);

	const newNames = queryAllByTestId('names').map(node => node.textContent);
	expect(newNames).toStrictEqual(['Brittany', 'Drake']);
});
