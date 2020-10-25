import React, { useContext } from 'react'
import { StoreContext } from '../../../Store/StoreContext';
import classes from './Message.module.css'
const Message = (props) => {
    const { text, uid, photoURL } = props.message;
    const { state, fire } = useContext(StoreContext)
    const messageClass = uid === fire.getCurrentUserID() ? classes.sent : classes.received;
    let regex = new RegExp('\\s+')
    let messages = text.split(regex)

    const checkStringLength = (string) => {
        let result
        if (string.length > 34) {
            result = [string.substr(0, 33), ...checkStringLength(string.substr(34))]
        }
        else {
            result = [string]
        }
        
        return result
    }
    
    //line break enforcer, add in later if time

    // let temp = messages.map((i, k) => {
    //     let split = checkStringLength(i)
    //     return split
    // })
    // console.log(temp)
    // temp = temp[0].join(" ")
    // console.log(temp)

    return (
        <div className={`${classes.message} ${messageClass}`}>
            {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
            <p>{text}</p>
        </div>
    )
}

export default Message