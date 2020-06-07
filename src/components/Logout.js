import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Logout = () => {
    const { logOut } = useContext(AuthContext);
    return (
        <button onClick={() => logOut()}>
            log  out
        </button>
    )
}

export default Logout;