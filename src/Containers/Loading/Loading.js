import React from 'react'
import ReactLoading from 'react-loading'
import classes from './Loading.module.css'

const Loading = () => {
    return (
        <div className={classes.loadingContainer}>
            <ReactLoading type="spinningBubbles" color="#FFFFFF"/>
        </div>
    )
}

export default Loading