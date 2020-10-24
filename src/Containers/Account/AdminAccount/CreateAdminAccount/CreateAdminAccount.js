import React, {useState} from 'react'
import { Button } from 'react-bootstrap'
import FormTemplate from '../../../../Components/UI/FormTemplate/FormTemplate'
import classes from './CreateAdminAccount.module.css'

const CreateAdminAccount = () => {
    const [firstForm, setFirstForm] = useState([
        {
            type: "Email",
            label: "Email",
            value: "",
            readOnly: false
        },
        {
            type: "Email",
            label: "Confirm Email",
            value: "",
            readOnly: false,
        }
    ])



    return (
        <form className={classes.container}>
                <h2>Create Rescue Cordinator</h2>
                <FormTemplate content={firstForm} template={1} change={setFirstForm}/>
                <Button type="submit" variant="info">Create</Button>
        </form>
    )
}

export default CreateAdminAccount