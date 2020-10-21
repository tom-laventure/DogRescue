import React from 'react'
import {  Dropdown,  InputGroup } from 'react-bootstrap'
import c1 from './FormStyles/FormTemplateVertical.module.css'
import c2 from './FormStyles/FormTemplateRowV2.module.css'
import c3 from './FormStyles/FormTemplateRow.module.css'

const FormTemplate = (props) => {
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
        temp[i].value = e.target.value
        props.change(temp)
    }

    const setInputType = (info, iterator) => {
        let transparent;
        let required = true;
        if('required' in info){
            required = info.required
        }
        if ("transparent" in info) {
            transparent = c1.makebackgroundTransparent
        }
        switch (info.type) {
            case "Text":
                if (!("checkbox" in info)) {
                    return <input id={info.label} id={info.label} name={info.label} type={info.type} value={info.value} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} required={required}/>
                }
                else {
                    return (
                        <div className={classes.dateCheckboxDiv}>
                            <input id={info.label} id={info.label} name={info.label} type={info.type} value={info.value} readOnly={info.readOnly} className={classes.date} onChange={(e) => change(e, iterator)} required={required}/>
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
                        <input id={info.label} name={info.label} type={info.type} value={info.value} readOnly={info.readOnly} className={classes.date} onChange={(e) => change(e, iterator)} required={required}/>
                        <InputGroup className={classes.checkbox}>
                            <p>Date Unknown</p>
                            <InputGroup.Checkbox onChange={(e) => info.checkBoxClick(e)} />
                        </InputGroup>
                    </div>)
                }
                else {
                    r = <input id={info.label} name={info.label} type={info.type} value={info.value} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} required={required}/>
                }
                return r
            case "Password":
                let p;
                if ("changePassword" in info) {
                    if (info.changePassword == true) {
                        p = (<div className={classes.passwordWithLink}>
                            <input id={info.label} name={info.label} type={info.type} value={info.value} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} required={required}/>
                            <a href="/Change-Password">Change Password</a>
                        </div>)
                    }
                }
                else {
                    p = <input id={info.label} name={info.label} type={info.type} value={info.value} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} required={required}/>
                }
                return p
            case "Email":
                let e;
                if ("changeEmail" in info) {
                    e = (<div className={classes.passwordWithLink}>
                        <input id={info.label} name={info.label} type={info.type} value={info.value} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} required={required}/>
                        <a href="/Change-Password">Change Email</a>
                    </div>)
                }
                else {
                    e = <input id={info.label} name={info.label} type={info.type} value={info.value} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} required={required}/>
                }
                return e
            case "Tel":
                let t = <input type="tel" id={info.label} name="phone" className={classes.formText + " " + transparent}  required={required} />
                // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                return t;
            default:
                return <input id={info.label} name={info.label} type={info.type} value={info.value} readOnly={info.readOnly} className={classes.formText + " " + transparent} onChange={(e) => change(e, iterator)} required={required}/>
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
        <div className={classes.form}>
            {formContent}
        </div>
    )
}

export default FormTemplate