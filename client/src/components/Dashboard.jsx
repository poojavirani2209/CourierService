import React, { useEffect, useState } from 'react';
import RequestProvider from '../api/apiRequestProvider';

function Dashboard() {
    const [userId, setUserId] = useState(null);
    const [shipments, setShipments] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserAndShipments = async () => {
            try {
                const shipmentsResponse = await RequestProvider.request().get('/shipments');
                shipmentsResponse.status == 200 && setShipments(shipmentsResponse);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchUserAndShipments();
    }, [userId]);

    return (
        <div>
            <h2>Dashboard</h2>
            <input type="text" placeholder="UserId" onChange={(e) => setUserId(e.target.value)} />

            {error && <div style={{ color: 'red' }}>{error}</div>}
            <h3>Your Shipments:</h3>
            <ul>
                {shipments.map((shipment) => (
                    <li key={shipment.id}>
                        {shipment.recipientName} - Status: {shipment.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
