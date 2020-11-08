import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { StoreContext } from '../../Store/StoreContext';

const PrivateRoute = ({ component: Component, authLevel: AuthLevel, ...rest }) => {
    const { state } = useContext(StoreContext)
    let userLevel = state.user.adminLevel
    let auth = (userLevel !== null && userLevel >= AuthLevel)
    console.log(auth)
    return (
        <Route {...rest} render={(props) => (
            auth ? <Component {...props} /> : <Redirect to="/"/>
        )}/>
    );
}

export default PrivateRoute;