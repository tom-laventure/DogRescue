import React from 'react'
import FormTemplate from '../UI/FormTemplate/FormTemplate'
import classes from './DogCard.module.css'
import img from '../../Resources/img/pup1.jpg'

const DogCard = () => {
    
    const theForm = [
            {
                type: "Text",
                label: "Status",
                placeholder: "Awaiting Arrival",
                readOnly: true
            },
            {
                type: "Text",
                label: "Adopters",
                placeholder: "Ken and Sam",
                readOnly: true
            },
            {
                type: "Text",
                label: "Handler",
                placeholder: "Jenny",
                readOnly: true
            },
            {
                type: "Date",
                label: "Inbound Date",
                placeholder: "2020-04-12",
                readOnly: true
            },
            {
                type: "Text",
                label: "Flight Details",
                placeholder: "1425 Air Canada",
                readOnly: true
            }
        ]

    return(
        <div className={classes.card}>
            <div className={classes.cardPhoto}>
                <p>Goofy</p>
                <img src={img} width="150px" height="150px"/>
            </div>
            <div className={classes.cardDetails}>
                <FormTemplate content={theForm}/>
            </div>
            <div className={classes.cardContact}>
                <button className={classes.contactButton}>Contact Handler</button>
            </div>
        </div>
    )
}

export default DogCard