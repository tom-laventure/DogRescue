import React, {useState} from 'react'
import classes from './AdminAccount.module.css'
import FormTemplate from '../../../Components/UI/FormTemplate/FormTemplate'
import { Button } from 'react-bootstrap'
import { validFileType } from '../../../Resources/Functions/ImageUpload'
import DragAndDrop from '../../../Components/UI/DragAndDrop/DragAndDrop'

const AdminAccount = () => {
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
                <div className={classes.imageDrop}></div>
            </div>
            <div className={classes.rightSide}>
                <h2>Admin Account</h2>
                <FormTemplate content={firstForm} template={1} change={setFirstForm}/>
                <Button onClick={() => null}>Submit</Button>
            </div>
        </div>
    )
}

export default AdminAccount