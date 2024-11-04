import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

function AdminHome() {
    return (
        <div>
            <h2>Admin Portal</h2>
            <div className="button-container">
                <Link to="/admin/login">
                    <button>Admin Login</button>
                </Link>
                <Link to="/admin/register">
                    <button>Register</button>
                </Link>
            </div>
        </div>
    );
}

export default AdminHome;
