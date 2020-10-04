import React, { useContext, useState, useEffect } from 'react'
import { Dropdown, Form, InputGroup } from 'react-bootstrap'
import { StoreContext } from '../../../Store/StoreContext'
import c1 from './FormStyles/FormTemplate.module.css'
import c2 from './FormStyles/SecondFormTemplate.module.css'
import c3 from './FormStyles/ThirdFormTemplate.module.css'

const FormTemplate = (props) => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
    let classes;
    switch (props.template) {
        case 1:
            classes = c1
            break;
        case 2:
            classes = c2
            break;
        case 3:
            classes = c3
            break;
        default:
            classes = c1
            break;
    }

    const change = (e, i) => {
        let temp = [...props.content]
        temp[i].placeholder = e.target.value
        props.change(temp)
    }

    const setInputType = (info, iterator) => {
        let transparent;
        if ("transparent" in info) {
            transparent = c1.makebackgroundTransparent
        }
        switch (info.type) {
            case "Text":
                if (!("checkbox" in info)) {
                    return <input id={info.label} name={info.label} type={info.type} value={info.placeholder} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} />
                }
                else {
                    return (
                        <div className={classes.dateCheckboxDiv}>
                            <input id={info.label} name={info.label} type={info.type} value={info.placeholder} readOnly={info.readOnly} className={classes.date} onChange={(e) => change(e, iterator)} />
                            <InputGroup className={classes.checkbox}>
                                <p>Date Unnown</p>
                                <InputGroup.Checkbox onChange={(e) => info.checkBoxClick(e)} />
                            </InputGroup>
                        </div>
                    )
                }
            case "DropDown":
                let dropdownItems = info.options.map((i, k) => {
                    return <Dropdown.Item key={k} onClick={() => info.select(i)}>{i}</Dropdown.Item>
                })
                return (
                    <Dropdown className={classes.dropDownButton}>
                        <Dropdown.Toggle variant="info" className={classes.dropDownButton}>
                            {info.placeholder}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {dropdownItems}
                        </Dropdown.Menu>
                    </Dropdown>
                )
            case "Date":
                let r;
                if (info.checkbox) {
                    r = (<div className={classes.dateCheckboxDiv}>
                        <input id={info.label} name={info.label} type={info.type} value={info.placeholder} readOnly={info.readOnly} className={classes.date} onChange={(e) => change(e, iterator)} />
                        <InputGroup className={classes.checkbox}>
                            <p>Date Unnown</p>
                            <InputGroup.Checkbox onChange={(e) => info.checkBoxClick(e)} />
                        </InputGroup>
                    </div>)
                }
                else {
                    r = <input id={info.label} name={info.label} type={info.type} value={info.placeholder} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} />
                }
                return r
            default:
                return <input id={info.label} name={info.label} type={info.type} value={info.placeholder} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} />
        }
    }

    let formContent = props.content.map((info, iterator) => {
        return (
            <div key={iterator} className={classes.formContainer}>
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