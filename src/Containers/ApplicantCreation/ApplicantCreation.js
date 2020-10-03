import React, { useState } from 'react'
import DragAndDrop from '../../Components/UI/DragAndDrop/DragAndDrop'
import FormTemplate from '../../Components/UI/FormTemplate/FormTemplate'
import classes from './ApplicantCreation.module.css'

const ApplicantCreation = () => {
    const [formInfo, setFormInfo] = useState([
        {
            type: "Text",
            label: "Status",
            placeholder: "",
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
                tempform[2].placeholder = item;
                setFormInfo(tempform)
            },
            placeholder: "Select Handler",
            readOnly: false
        },
        {
            type: "Date",
            label: "Inbound Date",
            placeholder: "",
            readOnly: false
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
        <div>
            <div className={classes.container}>
                <DragAndDrop handleDrop={() => HandleDrop()}>
                    <div className={classes.imageDrop}>

                    </div>
                </DragAndDrop>
                <FormTemplate content={formInfo} customClasses={classes} />
            </div>
        </div>
    )
}

export default ApplicantCreation