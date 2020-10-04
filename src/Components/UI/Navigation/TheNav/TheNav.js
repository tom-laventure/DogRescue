import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { StoreContext } from '../../../../Store/StoreContext'
import { Link } from 'react-router-dom'
import classes from './TheNav.module.css'

const TheNav = () => {
    const {  fire, actions } = useContext(StoreContext)

    const logOut = () => {
        fire.doSignOut(() => {
            actions.setCurrentUser(null)
        })
    }

    return (
        <Navbar  className={classes.nav} >
            <Navbar.Brand><Link to="/">Dog Rescue</Link></Navbar.Brand>
            <Nav className="mr-auto"></Nav>
            <Nav.Link className={classes.navButton} href="/user-account">User Account</Nav.Link>
            <Nav.Link className={classes.navButton} href="/admin-account">Admin Account</Nav.Link>
            <Nav.Link className={classes.navButton} href="/create-user">Create Applicant</Nav.Link>
            <Nav.Link className={classes.navButton} variant="dark" onClick={() => logOut()}>Logout</Nav.Link>
        </Navbar>
    )
}

export default TheNav;