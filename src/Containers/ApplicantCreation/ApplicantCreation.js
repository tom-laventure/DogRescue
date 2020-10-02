import React, { useState } from 'react'
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
            options:["Jenny","Tim","Sam"],
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


    return (
        <div>
            <div>
                <img />
            </div>
            <FormTemplate content={formInfo}/>
        </div>
    )
}

export default ApplicantCreation