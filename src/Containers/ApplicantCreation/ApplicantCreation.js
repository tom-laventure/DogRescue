import React, { useContext, useState } from 'react'
import DragAndDrop from '../../Components/UI/DragAndDrop/DragAndDrop'
import FormTemplate from '../../Components/UI/FormTemplate/FormTemplate'
import { StoreContext } from '../../Store/StoreContext'
import classes from './ApplicantCreation.module.css'
import { validFileType } from '../../Resources/Functions/ImageUpload'

const ApplicantCreation = () => {
    const { state, dispatch, actions, firebase } = useContext(StoreContext)
    const [dogImage, setDogImage] = useState()
    const storageRef = firebase.storage().ref()
    const dogImageRef = storageRef.child('DogPhotos')
    const [formInfo, setFormInfo] = useState([
        {
            type: "Text",
            label: "Email",
            placeholder: "",
            readOnly: false
        },
        {
            type: "DropDown",
            options: ["Awaiting Arrival", "Searching for Flight Volunteer"],
            label: "Status",
            select: (item) => {
                let tempform = [...formInfo]
                tempform[1].placeholder = item;
                setFormInfo(tempform)
            },
            placeholder: "Select Status",
            readOnly: false
        },
        {
            type: "Text",
            label: "Adopters",
            placeholder: "",
            readOnly: false
        },
        {
            type: "DropDown",
            options: ["Jenny", "Tim", "Sam"],
            label: "Handler",
            select: (item) => {
                let tempform = [...formInfo]
                tempform[3].placeholder = item;
                setFormInfo(tempform)
            },
            placeholder: "Select Handler",
            readOnly: false
        }
    ])
    const [secondFormInfo, setSecondFormInfo] = useState([
        {
            type: "Date",
            label: "Inbound Date",
            placeholder: "",
            readOnly: false,
            checkBoxClick: (e) => {
                let tempForm = [...secondFormInfo]
                if (e.target.checked) {
                    tempForm[0].type = "Text";
                    tempForm[0].readOnly = true;
                    tempForm[0].placeholder = "Not Currently Available"
                    tempForm[1].readOnly = true;
                    tempForm[1].placeholder = "Not Currently Available"
                }
                else {
                    tempForm[0].type = "Date";
                    tempForm[0].readOnly = false;
                    tempForm[0].placeholder = ""
                    tempForm[1].readOnly = false;
                    tempForm[1].placeholder = ""
                }
                setSecondFormInfo(tempForm)
            },
            checkbox: true
        },
        {
            type: "Text",
            label: "Flight Details",
            placeholder: "",
            readOnly: false
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
                        <label className={classes.formLabel} for="imageUpload">Choose File</label>
                        <input className={classes.hidden} type="file" id="imageUpload" accept="image/png, image/jpeg" onChange={(e) => imageLoad(e.target.files)} />
                    </div>
                </DragAndDrop>}
                <FormTemplate content={secondFormInfo} template={1} />
            </div>
            <div className={classes.rightSide}>
                <h2>Adoption Applicant Creation</h2>
                <FormTemplate content={formInfo} template={1} />
            </div>
        </div>
    )
}

export default ApplicantCreation