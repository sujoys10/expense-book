import React from 'react';
import Navbar from './NavBar';

const Layout = ({ children }) => (
    <div className="layout">
        <Navbar />
        {children}
    </div>
)

export default Layout;