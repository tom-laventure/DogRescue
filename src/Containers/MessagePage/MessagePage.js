import React, { useState } from 'react'
import MessageApp from '../../Components/MessageApp/MessageApp'
import classes from './MessagePage.module.css'

const MessagePage = () => {
    const [messages, setMessages] = useState([
        { text: "hello", uid: 1 },
        { text: "hi", uid: 2 },
        { text: "How are you?", uid: 3 }
    ])


    return (
        <div className={classes.messageContainer}>
            <MessageApp content={messages} change={setMessages} />
        </div>
    )
}

export default MessagePage