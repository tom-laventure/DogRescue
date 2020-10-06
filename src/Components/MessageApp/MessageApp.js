import React, { useRef, useState, useContext } from 'react';
import { StoreContext } from '../../Store/StoreContext'
import classes from './MessageApp.module.css'

const MessageApp = (props) => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
    const dummy = useRef();
    // const messagesRef = firestore.collection('messages');
    // const query = messagesRef.orderBy('createdAt').limit(25);

    // const [messages] = useCollectionData(query, { idField: 'id' });

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        //   const { uid, photoURL } = auth.currentUser;

        //   await messagesRef.add({
        //     text: formValue,
        //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //     uid,
        //     photoURL
        //   })

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className={classes.container}>
            <div className={classes.main}>

                {/* {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)} */}

                <span ref={dummy}></span>

            </div>

            <form onSubmit={sendMessage}>

                <input className={classes.input} value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

                <button className={classes.button} type="submit" disabled={!formValue}>🕊️</button>

            </form>
        </div>)
}

export default MessageApp