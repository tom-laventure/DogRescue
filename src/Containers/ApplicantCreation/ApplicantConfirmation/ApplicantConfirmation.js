import React, { useContext, useEffect, useState } from 'react'
import DragAndDrop from '../../../Components/UI/DragAndDrop/DragAndDrop'
import FormTemplate from '../../../Components/UI/FormTemplate/FormTemplate'
import { StoreContext } from '../../../Store/StoreContext'
import classes from './ApplicantConfirmation.module.css'
import { validFileType } from '../../../Resources/Functions/ImageUpload'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Loading from '../../Loading/Loading'

const UserAccount = (props) => {
    const {state, fire} = useContext(StoreContext)
    const [dogImage, setDogImage] = useState()
    const [firstForm, setFirstForm] = useState([
        {
            type: "Text",
            label: "Name",
            value: "",
            readOnly: false
        },
        {
            type: "Tel",
            label: "Phone Number",
            value: "",
            readOnly: false
        },
        {
            type: "Tel",
            label: "Alternative Phone Number",
            value: "",
            readOnly: false,
            required: false
        },
        {
            type: "Text",
            label: "Address",
            value: "",
            readOnly: false
        },
        {
            type: "Password",
            label: "Password",
            value: '',
            readOnly: false
        },
        {
            type: "Password",
            label: "Confirm Password",
            value: '',
            readOnly: false
        }
    ])
    const [secondForm, setSecondForm] = useState([
        {
            type: "Email",
            label: "Email",
            value: "",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Handler",
            value: "",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Dog Name",
            value: "",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Status",
            value: "",
            readOnly: true,
            transparent: true
        },

    ])
    const [thirdForm, setThirdForm] = useState([
        {
            type: "Text",
            label: "Inbound Date",
            value: "",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Flight Number",
            value: "",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Region",
            value: "",
            readOnly: true,
            transparent: true
        },
    ])
    useEffect(() => {
        fire.getProfileInfo(props.match.params.profileId, databaseCallback)
    }, [])

    const getProfileImage = (ref) => {
        fire.getProfileImage(ref, setDogImage)
    }

    const databaseCallback = (pi) => {
        let tempSecond = [...secondForm];
        let tempThird = [...thirdForm];

        tempSecond[0].value = pi.email
        tempSecond[1].value = pi.dogName
        tempSecond[2].value = pi.handler
        tempSecond[3].value = pi.status
        tempThird[0].value = pi.inboundDate
        tempThird[1].value = pi.flightDetails
        tempThird[2].value = pi.region
        setSecondForm(tempSecond)
        setThirdForm(tempThird)
        getProfileImage(pi.dogImage)
    }

    const resetImage = () => {
        setDogImage()
    }

    const formSubmission = (e) => {
        e.preventDefault()
        let flag = false
        let password = document.getElementById('Password'), confirm_password = document.getElementById('Confirm Password')
        if(password.value !== confirm_password.value){
            confirm_password.setCustomValidity('Passwords Do Not Match')
        }
        else{
            confirm_password.setCustomValidity('')
            flag = true
        }

        let dogProfileDetails = {
            adoptersName: firstForm[0].value,
            phone: firstForm[1].value,
            alternatePhone: firstForm[2].value,
            address: firstForm[3].value,
            email: secondForm[0].value,
            handler: secondForm[2].value,
            dogName: secondForm[1].value,
            status: secondForm[3].value,
            inboundDate: thirdForm[0].value,
            flightDetails: thirdForm[1].value,
            region: thirdForm[2].value,
            dogImage: dogImage.URL
        }
        fire.confirmDogProfile(dogProfileDetails, props.match.params.profileId, state.user.uid)
    }

    return (
        <form className={classes.container} onSubmit={(e) => formSubmission(e)}>
            <div className={classes.leftSide}>
                {dogImage ? <div className={classes.image}><img src={dogImage.URL} height='150px' width='150px' /></div> : <div className={classes.loadingContainer}><Loading/></div>}
                <FormTemplate content={thirdForm} template={1} change={setThirdForm} />
            </div>
            <div className={classes.rightSide}>
                <h2>User Account</h2>
                <FormTemplate content={firstForm} template={1} change={setFirstForm} />
                <FormTemplate content={secondForm} template={3} change={setSecondForm} />
                <div className={classes.submitButtonContainer}>
                    <Button type="submit" className={classes.submitButton} variant="info">Submit</Button>
                </div>
            </div>
        </form>
    )
}

export default withRouter(UserAccount)