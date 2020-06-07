import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const LoginForm = () => {
    const { error, logIn } = useContext(AuthContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        logIn(email, password);
    }

    return (
        <form className="authForm" onSubmit={handleLogin}>
            <pre style={{border: 'none', height: '20px', visibility: error ? 'visible' : 'hidden'}}>
                {error && 'Invalid Credential'}
            </pre>
            <input 
                name="email"
                placeholder="email"
                type="email"
                required
                value={email}
                onChange={handleEmailChange}
            />
            <input 
                name="password"
                placeholder="password"
                type="password"
                required
                value={password}
                minLength="6"
                onChange={handlePasswordChange}
            />
            <button type="submit">log in</button>
        </form>
    )
}

export default LoginForm;