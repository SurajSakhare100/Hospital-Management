import React, { useEffect, useState } from 'react'
import { AuthProvider } from './auth'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UseAuth({ children }) {
    const [status, setStatus] = useState(false);
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const navigate = useNavigate()
    console.log(status)
    const data = (emails) => {
        setemail(emails)
    }
    const logout = () => {
        setStatus(false)
    }
    const login = async(email) => {
        console.log(email)
        await axios.put('/api/hospital/isactive', { email });
        setStatus(true)
    }

    const auth = async () => {
        const response = await axios.post('/api/hospital/isactive', { username, email });
        console.log(response.data[0])
        try {
            if (response.data[0]) {
                setStatus(true);
                navigate('/')
            }
            else {
                setStatus(false)
                navigate('/auth/signin')
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    return (
        <AuthProvider value={{ status, login, logout, auth, data }}>
            {children}
        </AuthProvider>
    )
}

export default UseAuth
