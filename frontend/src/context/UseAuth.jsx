import React, { useState } from 'react'
import { AuthProvider } from './auth'

function UseAuth({ children }) {
    const [status, setStatus] = useState(false);
    const login = () => {
        setStatus(true)
    }
    const logout = () => {
        setStatus(false)
    }
    
    return (
        <AuthProvider value={{ status, login, logout }}>
            {children}
        </AuthProvider>
    )
}

export default UseAuth
