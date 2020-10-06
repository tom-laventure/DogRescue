import React from 'react'

const Message = (props) => {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? classes.sent : classes.recieved;

    return (
        <div className={`${classes.message} ${messageClass}`}>
            {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
            <p>{text}</p>
        </div>
        )
}

export default Message