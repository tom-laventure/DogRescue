import React, { useState } from 'react'
import DragAndDrop from '../../Components/UI/DragAndDrop/DragAndDrop'
import FormTemplate from '../../Components/UI/FormTemplate/FormTemplate'
import classes from './ApplicantCreation.module.css'

const ApplicantCreation = () => {
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
            options: [ "Jenny", "Tim", "Sam" ],
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
                if(e.target.checked){
                    tempForm[0].type = "Text";
                    tempForm[0].readOnly = true;
                    tempForm[0].placeholder = "Not Currently Available"
                    tempForm[1].readOnly = true;
                    tempForm[1].placeholder = "Not Currently Available"
                }
                else{
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

    const HandleDrop = (file) => {
        console.log(file)
    }

    return (
        <div className={classes.container}>
            <div className={classes.leftSide}>
                <div className={classes.imageDrop}></div>
                <FormTemplate content={secondFormInfo} customClasses={classes} template={1}/>
            </div>
            <div className={classes.rightSide}>
            <h2>Adoption Applicant Creation</h2>
            <FormTemplate content={formInfo} customClasses={classes} template={1}/>
            </div>
        </div>
    )
}

export default ApplicantCreation