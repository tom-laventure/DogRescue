import React from 'react'
import classes from './FormTemplate.module.css'

const FormTemplate = (props) => {

    let formContent = props.content.map((info, iterator) => {
        return <div key={iterator} className={classes.container}><label htmlFor={info.label}>{info.label}</label><input id={info.label} name={info.label} type={info.type} value={info.placeholder} readOnly={info.readOnly}/></div>
    })   

    return(
        <form className={classes.form}>
            {formContent}
        </form>
    )
}

export default FormTemplate