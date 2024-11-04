import React, { useState } from 'react';
import RequestProvider from '../api/apiRequestProvider';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            setMessage('');
            if (!email || !password) {
                setMessage('All fields are required');
                return;
            }
            const loginResponse = await RequestProvider.request().post(`/users/login`, { email, password });
            if (loginResponse.status == 402) {
                setMessage(loginResponse.response.data);
            }
            else {
                setMessage(loginResponse.data);
                onLogin();
                navigate("/")
            }
        } catch (error) {
            setMessage(`Login failed!`);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {message && <div style={{ color: 'red' }}>{message}</div>}
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
