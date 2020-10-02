import React, { useContext, useState, useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { StoreContext } from '../../../Store/StoreContext'
import classes from './FormTemplate.module.css'

const FormTemplate = (props) => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
    const [tempState, setTempState] = useState([...props.content])
    const change = (e, i) => {
        let temp = [...tempState]
        temp[i].placeholder = e.target.value
        setTempState(temp)
    }

    const setInputType = (info, iterator) => {
        switch (info.type) {
            case "Text":
                return <input id={info.label} name={info.label} type={info.type} value={info.placeholder} readOnly={info.readOnly} className={classes.text} onChange={(e) => change(e, iterator)} />
            case "DropDown":
                let dropdownItems = info.options.map((i, k) => {
                    return <Dropdown.Item key={k} onClick={() => info.select(i)}>{i}</Dropdown.Item>
                })
                return (
                    <Dropdown>
                        <Dropdown.Toggle variant="success">
                            {info.placeholder}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dropdownItems}
                        </Dropdown.Menu>
                    </Dropdown>
                )
            default:
                return <input id={info.label} name={info.label} type={info.type} value={info.placeholder} readOnly={info.readOnly} className={classes.text} onChange={(e) => change(e, iterator)} />
        }
    }

    let formContent = tempState.map((info, iterator) => {
        return (
            <div key={iterator} className={classes.container}>
                <label htmlFor={info.label}>
                    {info.label}
                </label>
                {setInputType(info, iterator)}
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