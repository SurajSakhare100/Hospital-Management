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
            await axios.post('/api/hospital/signup', { username, password, email });
            console.log('User registered successfully');
            navigate('/auth/signin')
            // Redirect or show success message
        } catch (error) {
            console.log('Error registering user:', error.message);
            // Handle error (e.g., display error message)
        }
    };

    return (
        <div className='w-full pl-72 pr-4 pt-2 bg-[#F8F9FA] h-screen flex items-center justify-center'>

            <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-1/2'>
                <h2 className='text-green-500 text-2xl text-center mb-3 font-semibold'>Sign In Form</h2>

                <input type="text" className='py-2 px-4 rounded-lg shadow-lg'    value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />

                <input type="email" className='py-2 px-4 rounded-lg shadow-lg'   value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" required />
                <input type="password" className='py-2 px-4 rounded-lg shadow-lg'    value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit" className='bg-green-500 rounded-lg px-4 py-1 text-white font-semibold shadow-xl'>Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
