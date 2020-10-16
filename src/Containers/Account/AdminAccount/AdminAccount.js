import React, {useState} from 'react'
import classes from './AdminAccount.module.css'
import FormTemplate from '../../../Components/UI/FormTemplate/FormTemplate'
import { Button } from 'react-bootstrap'

const AdminAccount = () => {
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
            type: "Email",
            label: "Email",
            placeholder: "Ken@jobs.ca",
            readOnly: true,
            transparent: true,
            changeEmail: true
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