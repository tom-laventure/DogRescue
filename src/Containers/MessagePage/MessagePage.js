import React, { useState } from 'react'
import MessageApp from '../../Components/MessageApp/MessageApp'
import classes from './MessagePage.module.css'

const MessagePage = () => {
    return (
        <div className={classes.messageContainer}>
            <MessageApp content={messages} change={setMessages} />
        </div>
    )
}

export default MessagePage