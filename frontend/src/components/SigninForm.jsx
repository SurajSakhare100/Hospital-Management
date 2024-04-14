// SigninForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useapi } from '../context/auth';
const SigninForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {login,status}=useapi()
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/hospital/signin', { username, password });
            login();
            navigate('/');
            // Redirect or show success message
        } catch (error) {
            console.error('Error logging in:', error.message);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div className='w-full pl-72 pr-4 pt-2 bg-[#F8F9FA]'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign In</button>
        </form>
        </div>
    );
};

export default SigninForm;
