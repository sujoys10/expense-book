import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const SignupForm = () => {
    const { signUp } = useContext(AuthContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        signUp(email, password);
    }

    return (
        <form className="authForm" onSubmit={handleSignup}>
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
            <button type="submit">sign up</button>
        </form>
    )
}

export default SignupForm;