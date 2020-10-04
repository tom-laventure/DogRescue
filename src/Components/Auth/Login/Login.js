import React, { useState, useContext, useEffect } from 'react'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import classes from './Login.module.css'
import FormPopUp from '../../UI/PopUps/FormPopUp/FormPopUp'
import Header from '../../UI/Header/Header'
import { StoreContext } from '../../../Store/StoreContext'
import AuxDiv from '../../../hoc/AuxDiv/AuxDiv'

const Login = (props) => {
    const { actions, fire } = useContext(StoreContext)
    const [userInfo, setUserInfo] = useState({
        form: {
            email: {
                elementConfig: {
                    type: 'email',
                    inputType: 'text',
                    label: 'Email'
                },
                validation: {
                },
                valid: false,
                value: '',

            },
            password: {
                elementConfig: {
                    type: 'password',
                    inputType: 'text',
                    label: 'Password'
                },
                validation: {
                },
                valid: false,
                value: '',
            }
        }
    })

    useEffect(()=> {

    }, [userInfo])

    const login = (e) => {
        e.preventDefault()
        // fire.addToPoll("-MA---VvMNIpYMCJIzY9")
        fire.doSignInWithEmailAndPassword(userInfo.form.email.value, userInfo.form.password.value).then((data) => {
            actions.setCurrentUser(data.user)
        }
        ).catch((error) => {
            actions.setErrorState(error)
        });
    }

    const change = (e, i) => {
        let temp = { ...userInfo }
        temp.form[i].value = e.target.value
        setUserInfo(temp)
    }


    let formElementsArray = [];
    for (let element in userInfo.form) {
        formElementsArray.push(element)
    }
    let Inputs = formElementsArray.map((i) => {
        let temp = userInfo.form[i];
        return <Input inputtype={temp.elementConfig.inputType} type={temp.elementConfig.type} onChange={(e) => change(e, i)} label={temp.elementConfig.label} key={i} />
    })


    return (
        <AuxDiv>
            <FormPopUp>
                <form onSubmit={(e) => login(e)}>
                    <div className={classes.headerContainer}>
                        <Header headerType="h3" content="Login" />
                    </div>
                    {Inputs}
                    <a href="" onClick={(e) => props.switch("reset", e)}>Forgot Password</a>
                    <div className={classes.buttonContainer}>
                        <Button value="Login" type="submit" />
                    </div>
                </form>
            </FormPopUp>
        </AuxDiv>
    )
}

export default Login