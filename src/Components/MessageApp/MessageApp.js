import React, { useRef, useState, useContext } from 'react';
import { StoreContext } from '../../Store/StoreContext'
import classes from './MessageApp.module.css'
import Message from './Message/Message'

const MessageApp = (props) => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
    const dummy = useRef();
    let name = "Jenny"
    let title = "Adoption Handler"
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
            <div className={classes.messageHeader}>
                <div className={classes.imageDrop}>
                </div>
                <div className={classes.contactInfo}>
                    <h4>{name}</h4>
                    <p>{title}</p>
                </div>
            </div>
            <div className={classes.main}>

                {props.content && props.content.map((msg, k) => <Message key={k} message={msg} />)}

                <span ref={dummy}></span>

            </div>

            <form onSubmit={sendMessage}>

                <textarea className={classes.input} value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

                <button className={classes.button} type="submit" disabled={!formValue}>Send</button>
            </form>
        </div>)
}

export default MessageApp