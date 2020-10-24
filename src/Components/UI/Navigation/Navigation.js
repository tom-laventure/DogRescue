import React, { useContext, useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { StoreContext } from '../../../Store/StoreContext'
import { Link } from 'react-router-dom'
import classes from './Navigation.module.css'
import messageIcon from '../../../Resources/img/email.png'

const TheNav = () => {
    const { state, fire, actions } = useContext(StoreContext)
    const logIn = () => {
        actions.setAuthPopUp(true)
    }
    const logOut = () => {
        fire.doSignOut(() => {
            actions.setCurrentUser(null)
        })
    }
    const [loginState, setLoginState] = useState({ fun: logIn, txt: "Login" })

    useEffect(() => {
        fire.authStateChange((user) => {
            if (!user) {
                setLoginState({ fun: logIn, txt: "Login" })
            }
            else {
                setLoginState({ fun: logOut, txt: "Logout" })
            }
        })
    }, [])

    let account;
    if (state.adminLevel === 1) {
        account = <Nav.Link className={classes.navButton} href="/user-account">Account</Nav.Link>
    }
    else {
        account = <Nav.Link className={classes.navButton} href="/admin-account">Account</Nav.Link>
    }

    return (
        <Navbar className={classes.nav} >
            <Navbar.Brand><Link to="/">Dog Rescue</Link></Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            {account}
            <Nav.Link className={classes.navButton} href="/create-user">Create Applicant</Nav.Link>
            <Nav.Link className={classes.navButton} variant="dark" onClick={() => loginState.fun()}>{loginState.txt}</Nav.Link>
            <Nav.Link className={classes.navButton} href="/message"><img className={classes.icon} src={messageIcon} /></Nav.Link>
        </Navbar>
    )
}

export default TheNav;