import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const PublicRoute = ({component: Component, ...rest}) => {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <Route {...rest} render={props => (
            !isLoggedIn ?
                <Component {...props}/>
            : <Redirect to="/template" />
        )}
        />
    ) 
}

export default PublicRoute;

