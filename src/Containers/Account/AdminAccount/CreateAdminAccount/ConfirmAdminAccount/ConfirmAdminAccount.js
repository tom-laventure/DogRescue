import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import DragAndDrop from '../../../../../Components/UI/DragAndDrop/DragAndDrop'
import FormTemplate from '../../../../../Components/UI/FormTemplate/FormTemplate'
import { validFileType } from '../../../../../Resources/Functions/ImageUpload'
import classes from './ConfirmAdminAccount.module.css'

const ConfirmAdminAccount = () => {
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
            readOnly: false,
        },
        {
            type: "Email",
            label: "Email",
            value: "Ken@jobs.ca",
            readOnly: true,
            transparent: true,
            changeEmail: true,
        },
        {
            type: "Password",
            label: "Password",
            value: "***********",
            readOnly: true,
            transparent: true,
            changePassword: true,
        }
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
        <div className={classes.container}>
            <div className={classes.leftSide}>
                {dogImage ? <div className={classes.image}><img src={dogImage.URL} height='150px' width='150px' /><button onClick={() => resetImage()}>X</button></div> : <DragAndDrop handleDrop={(e) => imageLoad(e)}>
                    <div className={classes.imageDrop}>
                        <p>Drop Image Here</p>
                        <p>Or</p>
                        <label className={classes.formLabel} htmlFor="imageUpload">Choose File</label>
                        <input className={classes.hidden} type="file" id="imageUpload" accept="image/png, image/jpeg" onChange={(e) => imageLoad(e.target.files)} />
                    </div>
                </DragAndDrop>}
                <p>.jpeg or .png only</p>
            </div>
            <div className={classes.rightSide}>
                <h2>Admin Account</h2>
                <FormTemplate content={firstForm} template={1} change={setFirstForm}/>
                <Button onClick={() => null}>Submit</Button>
            </div>
        </div>
    )
}

export default ConfirmAdminAccount