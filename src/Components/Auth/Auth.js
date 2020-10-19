import React, { useState, useContext, useEffect } from 'react'
import classes from './Auth.module.css'
import Login from './Login/Login'
import AuxBackground from '../../hoc/AuxBackground/AuxBackground'
import Register from './Register/Register'
import { StoreContext } from '../../Store/StoreContext'
import ErrorPopUp from '../UI/PopUps/ErrorPopUp/ErrorPopUp'
import ResetPassword from './ResetPassword/ResetPassword'


const Auth = (props) => {
    const [view, setView] = useState("login")
    let theView;

    const switchAuthView = (type, e) => {
        e.preventDefault()
        setView(type)
    }

    switch (view) {
        case "login":
            theView = <Login switch={switchAuthView} />;
            break;
        case "register":
            theView = <Register switch={switchAuthView} />
            break;
        case "reset":
            theView = <ResetPassword switch={switchAuthView} />
            break;
        default:
            theView = <Login switch={switchAuthView} />;
            break;
    }

    return (
        <AuxBackground zIndex="low">
            {theView}
        </AuxBackground>
    )
}

export default Auth