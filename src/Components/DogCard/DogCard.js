import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../Store/StoreContext'
import FormTemplate from '../UI/FormTemplate/FormTemplate'
import classes from './DogCard.module.css'
import ReactLoading from 'react-loading'
import { Button } from 'react-bootstrap'

const DogCard = (props) => {
    const { state, firebase } = useContext(StoreContext)
    const [dogForm, setDogForm] = useState([...props.info])
    const [changesToForm, setChangesToForm] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [saveOrCancelButtons, setSaveOrCancelButtons] = useState(<div className={classes.saveOrCancelButtons}></div>)
    const [dogImage, setDogImage] = useState('')
    const storageRef = firebase.storage().ref()
    storageRef.child('DogPhotos/krlj9E1yjrd2O75Bd4KE4FwrHdc21603133881321.jpeg').getDownloadURL().then((url) => {
        setDogImage(url);
    })
    let contactHandlerButton;

    useEffect(() => {
        if(dogImage !== ''){
            setImageLoaded(true)
        }
    }, [dogImage])


    useEffect(() => {
        if(dogForm[0].type == "DropDown"){
            dogForm[0].select = (item) => {
                let dogform = [...dogForm]
                dogform[0].value = item;
                dogform[0].placeholder = item;
                setDogForm(dogform)
            }
        }
        if(dogForm[2].type == "DropDown"){
            dogForm[2].select = (item) => {
                let dogform = [...dogForm]
                dogform[2].value = item;
                dogform[2].placeholder = item;
                setDogForm(dogform)
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
                {imageLoaded ? <img src={dogImage} width="150px" height="150px" />: <div className={classes.placeholder}> <ReactLoading type="spinningBubbles" color="#FFFFFF"/></div>}
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