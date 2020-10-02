import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../Store/StoreContext'
import FormTemplate from '../UI/FormTemplate/FormTemplate'
import classes from './DogCard.module.css'
import img from '../../Resources/img/pup1.jpg'

const DogCard = (props) => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
    let contactHandlerButton;
    if(state.adminLevel === 0){
        contactHandlerButton = <button className={classes.contactButton}>Contact Handler</button>
    }

    return(
        <div className={classes.card}>
            <div className={classes.cardPhoto}>
                <p>{props.info.dogName}</p>
                <img src={img} width="150px" height="150px"/>
            </div>
            <div className={classes.cardDetails}>
                <FormTemplate content={props.info.theForm}/>
            </div>
            <div className={classes.cardContact}>
                {contactHandlerButton}
            </div>
        </div>
    )
}

export default DogCard