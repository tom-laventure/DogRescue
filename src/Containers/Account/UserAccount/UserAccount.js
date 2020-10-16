import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import FormTemplate from '../../../Components/UI/FormTemplate/FormTemplate'
import classes from './UserAccount.module.css'

const UserAccount = () => {
    const [firstForm, setFirstForm] = useState([
        {
            type: "Text",
            label: "Name",
            placeholder: "",
            readOnly: false
        },
        {
            type: "Tel",
            label: "Phone Number",
            placeholder: "",
            readOnly: false
        },
        {
            type: "Tel",
            label: "Alternative Phone Number",
            placeholder: "",
            readOnly: false
        },
        {
            type: "Text",
            label: "Address",
            placeholder: "",
            readOnly: false
        },
        {
            type: "Password",
            label: "Password",
            placeholder: "***********",
            readOnly: true,
            transparent: true,
            changePassword: true

        }
    ])
    const [secondForm, setSecondForm] = useState([
        {
            type: "Email",
            label: "Email",
            placeholder: "Ken@jobs.ca",
            readOnly: true,
            transparent: true,
            changeEmail: true
        },
        {
            type: "Text",
            label: "Handler",
            placeholder: "Jenny",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Dog Name",
            placeholder: "Goofy",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Status",
            placeholder: "Awaiting Arrival",
            readOnly: true,
            transparent: true
        },

    ])
    const [thirdForm, setThirdForm] = useState([
        {
            type: "Text",
            label: "Inbound Date",
            placeholder: "10/12/2020",
            readOnly: true,
            transparent: true
        },
        {
            type: "Text",
            label: "Flight Number",
            placeholder: "1025 Air Canada",
            readOnly: true,
            transparent: true
        },
    ])

    return (
        <form className={classes.container} onSubmit={(e) => e.preventDefault()}>
            <div className={classes.leftSide}>
                <div className={classes.imageDrop}></div>
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