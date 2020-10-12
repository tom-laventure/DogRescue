import React from 'react'
import classes from './Layout.module.css'
import TheNav from '../../Components/UI/Navigation/Navigation'
import ErrorPopUp from '../../Components/UI/PopUps/ErrorPopUp/ErrorPopUp'
import Footer from '../../Components/UI/Footer/Footer'

const Layout = (props) => {
    return (
        <div className={classes.container}>
            <TheNav />
            <ErrorPopUp />
            {props.children}
            <Footer />
        </div>
    )
}

export default Layout