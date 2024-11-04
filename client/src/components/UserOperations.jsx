import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Button.css";


function UserOperations() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Please select an option to proceed:</p>
            <button onClick={() => navigate('/dashboard')}>
                Dashboard
            </button>
            <button onClick={() => navigate('/create-shipment')}>
                CreateShipment
            </button>
            <button onClick={() => navigate('/track-shipment')}>
                TrackShipment
            </button>
        </div>
    );
}

export default UserOperations;
