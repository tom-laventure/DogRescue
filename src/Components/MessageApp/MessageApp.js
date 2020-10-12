import React, { useRef, useState, useContext, useEffect } from 'react';
import { StoreContext } from '../../Store/StoreContext'
import classes from './MessageApp.module.css'
import Message from './Message/Message'
import 'firebase/firestore';

import { useCollectionData } from 'react-firebase-hooks/firestore';
import TextareaAutosize from 'react-autosize-textarea/lib';

const MessageApp = (props) => {
    const { state, dispatch, actions, fire, firebase } = useContext(StoreContext)
    const [formValue, setFormValue] = useState('')
    const [theMessages, setTheMessages] = useState([])
    const auth = firebase.auth();
    const firestore = firebase.firestore();
    const messagesRef = firestore.collection('Chat').doc('Groups').collection(auth.currentUser.uid)
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query);
    const dummy = useRef(null);
    let name = "Jenny"
    let title = "Adoption Handler"


    useEffect(() => {
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages])

    const sendMessage = async (e) => {
        e.preventDefault();
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();

        messagesRef.add({
            text: formValue,
            createdAt: timestamp,
            uid: state.user.uid
        })
        setFormValue('');
    }
    
    return (
        <div className={classes.container}>
            <div className={classes.messageHeader}>
                <div className={classes.imageDrop}>
                </div>
                <div className={classes.contactInfo}>
                    <h4>{name}</h4>
                    <p>{title}</p>
                </div>
            </div>
            <div className={classes.main}>

                {messages && messages.map((msg, k) => <Message key={k} message={msg} />)}

                <span ref={dummy}></span>

            </div>

            <form onSubmit={sendMessage}>

                <TextareaAutosize id="messageInput" maxRows={5} className={classes.input} value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice"/>

                {/* <textarea id="messageInput" className={classes.input} value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" /> */}
                <button className={classes.button} type="submit" disabled={!formValue}>Send</button>
            </form>
        </div>)
}

export default MessageApp