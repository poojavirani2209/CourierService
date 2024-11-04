import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Button.css";

function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to the Shipping Service</h1>
            <p>Please select an option to proceed:</p>
            <button onClick={() => navigate('/user-login')}>
                User Login
            </button>
            <button onClick={() => navigate('/register')}>
                Register
            </button>
        </div>
    );
}



export default Home;
