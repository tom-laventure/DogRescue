import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import FormTemplate from '../../../Components/UI/FormTemplate/FormTemplate'
import classes from './UserAccount.module.css'
import { validFileType } from '../../../Resources/Functions/ImageUpload'
import DragAndDrop from '../../../Components/UI/DragAndDrop/DragAndDrop'

const UserAccount = () => {
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
            readOnly: false
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
            value: "***********",
            readOnly: true,
            transparent: true,
            changePassword: true

        }
    ])
    const [secondForm, setSecondForm] = useState([
        {
            type: "Email",
            label: "Email",
            value: "Ken@jobs.ca",
            readOnly: true,
            transparent: true,
            changeEmail: true
        },
        {
            type: "Text",
            label: "Handler",
            value: "Jenny",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Dog Name",
            value: "Goofy",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Status",
            value: "Awaiting Arrival",
            readOnly: true,
            transparent: true
        },

    ])
    const [thirdForm, setThirdForm] = useState([
        {
            type: "Text",
            label: "Inbound Date",
            value: "10/12/2020",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Flight Number",
            value: "1025 Air Canada",
            readOnly: true,
            transparent: true
        },
    ])

    const imageLoad = (files) => {
        let file = files[0]
        if (validFileType(file)) {
            let url = URL.createObjectURL(file)
            document.getElementById('imageUpload').style.opacity = 0
            setDogImage({URL: url, File: file})
        }
    }

    const resetImage = () => {
        setDogImage()
    }

    return (
        <form className={classes.container} onSubmit={(e) => e.preventDefault()}>
            <div className={classes.leftSide}>
                {dogImage ? <div className={classes.image}><img src={dogImage.URL} height='150px' width='150px' /><button onClick={() => resetImage()}>X</button></div> : <DragAndDrop handleDrop={(e) => imageLoad(e)}>
                    <div className={classes.imageDrop}>
                        <p>Drop Image Here</p>
                        <p>Or</p>
                        <label className={classes.formLabel} htmlFor="imageUpload">Choose File</label>
                        <input className={classes.hidden} type="file" id="imageUpload" accept="image/png, image/jpeg" onChange={(e) => imageLoad(e.target.files)} />
                    </div>
                </DragAndDrop>}
                <FormTemplate content={thirdForm} template={1} change={setThirdForm} />
            </div>
            <div className={classes.rightSide}>
                <h2>User Account</h2>
                <FormTemplate content={firstForm} template={1} change={setFirstForm} />
                <FormTemplate content={secondForm} template={3} change={setSecondForm} />
                <div className={classes.submitButtonContainer}>
                    <Button type="submit" className={classes.submitButton} onClick={() => null}>Submit</Button>
                </div>
            </div>
        </form>
    )
}

export default UserAccount