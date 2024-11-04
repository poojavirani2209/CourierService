import React, { useEffect, useState } from 'react';
import RequestProvider from '../api/apiRequestProvider';

function Dashboard({ isAdmin, userId }) {
    const [shipments, setShipments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserAndShipments = async () => {
            try {
                let shipmentsResponse;
                if (isAdmin) {
                    shipmentsResponse = await RequestProvider.request().get('/shipments');
                } else {
                    shipmentsResponse = await RequestProvider.request().get(`/shipments?userId=${userId}`);
                }
                shipmentsResponse.status == 200 && setShipments(shipmentsResponse.data);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchUserAndShipments();
    },[userId]);

    return (
        <div>
            <h2>Dashboard</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <h3>Your Shipments:</h3>
            <ul>
                {shipments.map((shipment) => (
                    <li key={shipment.id}>
                        {shipment.recipient_name} - Status: {shipment.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
