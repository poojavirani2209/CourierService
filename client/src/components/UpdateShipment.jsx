import React, { useState } from 'react';
import RequestProvider from '../api/apiRequestProvider';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateShipmentStatus() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');

    async function handleUpdate(event) {
        try {
            event.preventDefault();
            await RequestProvider.request().post(`/shipments/update/${id}`, { status });
            navigate('/dashboard-admin');
        } catch (err) {
            setError('Failed to update shipment status');
        }
    };

    return (
        <div>
            <h2>Update Shipment Status</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            Status:
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
            </select>
            <button onClick={handleUpdate}>Update Status</button>

        </div>
    );
}

export default UpdateShipmentStatus;
