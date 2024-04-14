// SignupForm.js

import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/hospital/signup', { username, password ,email});
            console.log('User registered successfully');
            navigate('/auth/signin')
            // Redirect or show success message
        } catch (error) {
            console.log('Error registering user:', error.message);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div className='w-full pl-72 pr-4 pt-2 bg-[#F8F9FA]'>
            
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Sign Up</button>
        </form>
        </div>
    );
};

export default SignupForm;
