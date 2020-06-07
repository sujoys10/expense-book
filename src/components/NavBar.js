import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logout from './Logout';

export default function Navbar(){

    return(
        <div className="navbar">
            <Link className="logo" to="/">Expense Book</Link>
            <Logout />
            <div className="navbar__links">
                <NavLink to="/template" activeClassName="selected">Template</NavLink>
                <NavLink to="/expense" activeClassName="selected">Expense</NavLink>
                <NavLink to="/summary" activeClassName="selected">Summary</NavLink>
            </div>
        </div>
    )
}

