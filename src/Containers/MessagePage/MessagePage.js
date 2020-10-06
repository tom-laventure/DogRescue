import React from 'react'
import MessageApp from '../../Components/MessageApp/MessageApp'
import classes from './MessagePage.module.css'

const MessagePage = () => {
    return(
        <div className={classes.messageContain}>
            <MessageApp />
        </div>
    )
}

export default MessagePage