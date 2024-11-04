import React, { useState } from 'react';
import RequestProvider from '../api/apiRequestProvider';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderAddress, setSenderAddress] = useState('');
    const [message, setMessage] = useState('');


    const handleRegister = async () => {
        try {
            setMessage('');
            if (!email || !password || !senderName || !senderAddress) {
                setMessage('All fields are required');
                return;
            }
            const registrationResponse = await RequestProvider.request().post('/users/register', { email, password, senderName, senderAddress });
            setMessage(registrationResponse.data);
        } catch (error) {
            setMessage('Registration failed!');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {message && <div style={{ color: 'red' }}>{message}</div>}
            <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Sender Name" onChange={(e) => setSenderName(e.target.value)} />
            <input type="text" placeholder="Sender Address" onChange={(e) => setSenderAddress(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
