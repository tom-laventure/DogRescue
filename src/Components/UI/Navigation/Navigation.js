import React, { useContext, useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { StoreContext } from '../../../Store/StoreContext'
import { Link } from 'react-router-dom'
import classes from './Navigation.module.css'
import messageIcon from '../../../Resources/img/email.png'
import { NavDropdown } from 'react-bootstrap'

const TheNav = () => {
    const { state, fire, actions } = useContext(StoreContext)
    const logIn = () => {
        actions.setAuthPopUp(true)
    }
    const logOut = () => {
        fire.doSignOut(() => {
            actions.setCurrentUser({ adminLevel: 0, loaded: false })
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
    if (state.user.adminLevel === 0 && fire.getCurrentUserID()) {
        account = <Link className={classes.dropDown} to="/user-account">Account</Link>
    }
    else if (state.user.adminLevel > 0) {
        account = (<><Link className={classes.dropDown} to="/admin-account">Account</Link><Link className={classes.dropDown} to="/create-user">Create Applicant</Link></>)
    }



    return (
        <Navbar className={classes.nav} >
            <Navbar.Brand><Link to="/">Dog Rescue</Link></Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            <NavDropdown title="Settings" id="collasible-nav-dropdown">
                {account}
            </NavDropdown>
            <Nav.Link className={classes.navButton} variant="dark" onClick={() => loginState.fun()}>{loginState.txt}</Nav.Link>
        </Navbar>
    )
}

export default TheNav;