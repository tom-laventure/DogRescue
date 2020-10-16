import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../Store/StoreContext'
import FormTemplate from '../UI/FormTemplate/FormTemplate'
import classes from './DogCard.module.css'
import img from '../../Resources/img/pup1.jpg'
import { Button } from 'react-bootstrap'

const DogCard = (props) => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
    const [dogForm, setDogForm] = useState([...props.info])
    const [changesToForm, setChangesToForm] = useState(false)
    const [saveOrCancelButtons, setSaveOrCancelButtons] = useState(<div className={classes.saveOrCancelButtons}></div>)
    let contactHandlerButton;

    

    useEffect(() => {
        if(dogForm[0].type == "DropDown"){
            dogForm[0].select = (item) => {
                let dogform = [...dogForm]
                dogform[0].placeholder = item;
                setDogForm(dogform)
                console.log("hres")
            }
        }
        if(dogForm[2].type == "DropDown"){
            dogForm[2].select = (item) => {
                let dogform = [...dogForm]
                dogform[2].placeholder = item;
                setDogForm(dogform)
                console.log("hres")
            }
        }
    }, [])

    useEffect(() => {
        if (changesToForm) {
            setSaveOrCancelButtons(
                <div className={classes.saveOrCancelButtons}>
                    <Button variant="success" onClick={() => setChangesToForm(false)}>Save</Button>
                    <Button variant="danger" onClick={() => setChangesToForm(false)}>Cancel</Button>
                </div>
            )
        }
        else {
            setSaveOrCancelButtons()
        }
    }, [changesToForm])

    const ChangesToDogForm = (form) => {
        setChangesToForm(true)
        setDogForm(form)
    }

    if (state.adminLevel === 0) {
        contactHandlerButton = <button className={classes.contactButton}>Contact Handler</button>
    }
    return (
        <div className={classes.card}>
            <div className={classes.cardPhoto}>
                <p>{props.dogName}</p>
                <img src={img} width="150px" height="150px" />
            </div>
            <div className={classes.cardDetails}>
                <FormTemplate content={dogForm} template={2} change={ChangesToDogForm} />
            </div>
            <div className={classes.cardContact}>
                {contactHandlerButton}
                {saveOrCancelButtons}
            </div>
        </div>
    )
}

export default DogCard