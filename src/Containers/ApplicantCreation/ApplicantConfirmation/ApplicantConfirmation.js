import React, { useContext, useEffect, useState } from 'react'
import DragAndDrop from '../../../Components/UI/DragAndDrop/DragAndDrop'
import FormTemplate from '../../../Components/UI/FormTemplate/FormTemplate'
import { StoreContext } from '../../../Store/StoreContext'
import classes from './ApplicantConfirmation.module.css'
import { validFileType } from '../../../Resources/Functions/ImageUpload'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Loading from '../../Loading/Loading'
import FormPopUp from '../../../Components/UI/PopUps/FormPopUp/FormPopUp'

const UserAccount = (props) => {
    const { state, actions, fire } = useContext(StoreContext)
    const [dogImage, setDogImage] = useState()
    const [loading, setLoading] = useState(true)
    const [oldProfile, setOldProfile] = useState(true)
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

    // fire.authStateChange((auth) => {
    //     if(auth) {
    //         console.log("user logged in")
    //     }
    //     else{
    //         console.log("na")
    //     }
    // })


    useEffect(() => {
        if (props.match.params.accountExists == 'true') {

            if (fire.getCurrentUserID()) {
                fire.getTempProfileInfo(props.match.params.profileId, existingProfileForm)
            }
            else if (state.user == null) {
                actions.setAuthPopUp(true)
            }
        }
        else {
            fire.getTempProfileInfo(props.match.params.profileId, newProfileForm)
        }
    }, [state.user])

    const getProfileImage = (ref) => {
        fire.getProfileImage(ref, setDogImage)
    }

    const existingProfileForm = (pi) => {
        setLoading(false)
        getProfileImage(pi.dogImage)
    }

    const newProfileForm = (pi) => {
        let tempSecond = [...secondForm];
        let tempThird = [...thirdForm];
        tempSecond[0].value = pi.email
        tempSecond[1].value = pi.handlerName
        tempSecond[2].value = pi.dogName
        tempSecond[3].value = pi.status
        tempThird[0].value = pi.inboundDate
        tempThird[1].value = pi.flightDetails
        tempThird[2].value = pi.region
        setSecondForm(tempSecond)
        setThirdForm(tempThird)
        setOldProfile(pi)
        setLoading(false)
        getProfileImage(pi.dogImage)
    }

    const formSubmission = async (e) => {
        e.preventDefault()
        let flag = false
        let password = document.getElementById('Password'), confirm_password = document.getElementById('Confirm Password')
        if (password.value !== confirm_password.value) {
            confirm_password.setCustomValidity('Passwords Do Not Match')
        }
        else {
            confirm_password.setCustomValidity('')
            flag = true
        }
        if (flag) {
            let user = await fire.doCreateUserWithEmailAndPassword(secondForm[0].value, firstForm[4].value).then((data) => {
                return data.user
            }).catch((error) => {
                actions.setErrorState(error)
            })
            if (user !== undefined) {
                let dogProfileDetails = {
                    dogName: oldProfile.dogName,
                    dogID: props.match.params.profileId,
                    handlerName: oldProfile.handlerName,
                    handlerId: oldProfile.handlerId,
                    status: oldProfile.status,
                    inboundDate: oldProfile.inboundDate,
                    flightDetails: oldProfile.flightDetails,
                    createdTime: oldProfile.createdTime,
                    dogImage: oldProfile.dogImage,
                    uid: user.uid
                }

                let userProfileDetails = {
                    adoptersName: firstForm[0].value,
                    phone: firstForm[1].value,
                    alternatePhone: firstForm[2].value,
                    address: firstForm[3].value,
                    uid: user.uid,
                    email: secondForm[0].value,
                    dogProfiles: [{dogID: props.match.params.profileId, dogName: oldProfile.dogName}],
                    adminLevel: 0,
                    loaded: true
                }
                await fire.confirmDogProfile(userProfileDetails, dogProfileDetails, props.match.params.profileId).then(() => {
                    props.history.push('/')
                }).catch((err) => {
                    actions.setErrorState(err)
                })
            }
            else{
                props.history.push('/')
            }
        }
    }


    return (
        <form className={classes.container} onSubmit={(e) => formSubmission(e)}>
            {loading ? <Loading /> : <>
                <div className={classes.leftSide}>
                    {dogImage ? <div className={classes.image}><img src={dogImage.URL} height='150px' width='150px' /></div> : <div className={classes.loadingContainer}><Loading /></div>}
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
            </>}
        </form>
    )
}

export default withRouter(UserAccount)