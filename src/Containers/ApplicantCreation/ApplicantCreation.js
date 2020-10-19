import React, { useContext, useState } from 'react'
import DragAndDrop from '../../Components/UI/DragAndDrop/DragAndDrop'
import FormTemplate from '../../Components/UI/FormTemplate/FormTemplate'
import { StoreContext } from '../../Store/StoreContext'
import classes from './ApplicantCreation.module.css'
import { validFileType } from '../../Resources/Functions/ImageUpload'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const ApplicantCreation = (props) => {
    const { state, fire, actions } = useContext(StoreContext)
    const [dogImage, setDogImage] = useState()
    const [formInfo, setFormInfo] = useState([
        {
            type: "Text",
            label: "Email",
            value: "tom.laventure42@gmail.com",
            readOnly: false,
            required: true
        },
        {
            type: "DropDown",
            options: ["Awaiting Arrival", "Searching for Flight Volunteer"],
            label: "Status",
            select: (item) => {
                let tempform = [...formInfo]
                tempform[1].value = item;
                tempform[1].placeholder = item;
                setFormInfo(tempform)
            },
            value: "Awaiting Arrival",
            readOnly: false,
            required: true,
            placeholder: 'Select Status'
        },
        {
            type: "Text",
            label: "Dog Name",
            value: "Goofy",
            readOnly: false,
            required: true
        },
        {
            type: "DropDown",
            options: ["Jenny", "Tim", "Sam"],
            label: "Handler",
            select: (item) => {
                let tempform = [...formInfo]
                tempform[3].value = item;
                tempform[3].placeholder = item;
                setFormInfo(tempform)
            },
            value: "Jenny",
            readOnly: false,
            required: true,
            placeholder: 'Select Handler'
        },
        {
            type: "DropDown",
            options: ["South Korea", "India"],
            label: "Region",
            select: (item) => {
                let tempform = [...formInfo]
                tempform[4].value = item;
                tempform[4].placeholder = item;
                setFormInfo(tempform)
            },
            value: "South Korea",
            readOnly: false,
            required: true,
            placeholder: 'Select Region'
        },
    ])
    const [secondFormInfo, setSecondFormInfo] = useState([
        {
            type: "Date",
            label: "Inbound Date",
            value: "2020-04-10",
            readOnly: false,
            checkBoxClick: (e) => {
                let tempForm = [...secondFormInfo]
                if (e.target.checked) {
                    tempForm[0].type = "Text";
                    tempForm[0].readOnly = true;
                    tempForm[0].value = "Not Currently Available"
                    tempForm[1].readOnly = true;
                    tempForm[1].value = "Not Currently Available"
                }
                else {
                    tempForm[0].type = "Date";
                    tempForm[0].readOnly = false;
                    tempForm[0].value = ""
                    tempForm[1].readOnly = false;
                    tempForm[1].value = ""
                }
                setSecondFormInfo(tempForm)
            },
            checkbox: true,
            required: true
        },
        {
            type: "Text",
            label: "Flight Details",
            value: "N/A",
            readOnly: false,
            required: true
        }
    ])

    const imageLoad = (files) => {
        let file = files[0]
        if (validFileType(file)) {
            let url = URL.createObjectURL(file)
            document.getElementById('imageUpload').style.opacity = 0
            setDogImage({ URL: url, File: file })
        }
    }

    const resetImage = () => {
        setDogImage()
    }

    const submit = (e) => {
        e.preventDefault()
        let flag = formInfo.some((i) => {
            return i.value === ""
        })

        let flag2 = secondFormInfo.some((i) => {
            return i.value === ""
        })

        let flag3 = dogImage == null
        if (true) {
            let time = new Date().getTime()
            let dogProfileDetails = {
                email: formInfo[0].value,
                status: formInfo[1].value,
                adoptersName: formInfo[2].value,
                handler: formInfo[3].value,
                region:  formInfo[4].value,
                inboundDate: secondFormInfo[0].value,
                flightDetails: secondFormInfo[1].value,
                createdTime: time,
                handlerId: state.user.uid,
                dogImage: ''
            }

           fire.createDogProfile(dogProfileDetails, dogImage.File, accountCreated)
        }
    }

    const accountCreated = (result) => {
        if(result.flag){
            props.history.push('/')
        }
        else{
            actions.setErrorState(result.error)
        }
    }
    console.log(props)
    return (
        <form className={classes.container} onSubmit={(e) => submit(e)}>
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
                <FormTemplate content={secondFormInfo} change={setSecondFormInfo} template={1} />
            </div>
            <div className={classes.rightSide}>
                <h2>Adoption Applicant Creation</h2>
                <FormTemplate content={formInfo} change={setFormInfo} template={1} />
                <Button variant="info" type="submit">Create</Button>
            </div>
        </form>
    )
}

export default withRouter(ApplicantCreation)