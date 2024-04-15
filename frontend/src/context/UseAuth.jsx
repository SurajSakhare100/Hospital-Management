import React, { useEffect, useState } from 'react'
import { AuthProvider } from './auth'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UseAuth({ children }) {
    const [status, setStatus] = useState(false);
    const [username, setusername] = useState('');
    const [email, setemail] = useState('admin');
    const navigate = useNavigate()

    // const userlogin = async(emaild) => {
    //     console.log(emaild)
    //     const response=await axios.post('/api/hospital/welcomepage', { emaild });
    //     console.log(response)
    //     setusername(emaild)
    // }

    const data = (emails) => {
        setemail(emails)
        // userlogin(emails)
    }
    const logout = () => {
        setStatus(false)
    }
    const login = async(email) => {
        await axios.put('/api/hospital/isactive', { email });
        setStatus(true)
    }

    const auth = async () => {
        const response = await axios.post('/api/hospital/isactive', { username, email });
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
        <AuthProvider value={{ status, login, logout, auth, data,email,username }}>
            {children}
        </AuthProvider>
    )
}

export default UseAuth
