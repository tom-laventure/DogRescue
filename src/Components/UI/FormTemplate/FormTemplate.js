import React, { useContext, useState, useEffect } from 'react'
import { StoreContext } from '../../../Store/StoreContext'
import classes from './FormTemplate.module.css'

const FormTemplate = (props) => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
    const [tempState, setTempState] = useState([...props.content])
    const change = (e, i) => {
        let temp = [ ...tempState ]
        temp[i].placeholder = e.target.value
        setTempState(temp)
    }

    let formContent = tempState.map((info, iterator) => {
        return (
        <div key={iterator} className={classes.container}>
            <label htmlFor={info.label}>
                {info.label}
            </label>
            <input id={info.label} name={info.label} type={info.type} value={info.placeholder} readOnly={info.readOnly} className={classes.text} onChange={(e) => change(e, iterator)} />
        </div>
        )
    })

    return (
        <form className={classes.form}>
            {formContent}
        </form>
    )
}

export default FormTemplate