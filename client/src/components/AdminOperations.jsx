import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Button.css";

function AdminOperations() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Please select an option to proceed:</p>
            <button onClick={() => navigate('/dashboard-admin')}>
                Dashboard
            </button>
        </div>
    );
}

export default AdminOperations;
