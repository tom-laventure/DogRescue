import React, { useState, useContext, useEffect } from 'react'
import Button from '../../UI/Button/Button'
import Input from '../../UI/Input/Input'
import classes from './Login.module.css'
import FormPopUp from '../../PopUps/FormPopUp/FormPopUp'
import Header from '../../UI/Header/Header'
import { StoreContext } from '../../../Store/StoreContext'
import ErrorPopUp from '../../PopUps/ErrorPopUp/ErrorPopUp'
import AuxDiv from '../../../hoc/AuxDiv/AuxDiv'

const Login = (props) => {
    const { state, dispatch, actions, fire } = useContext(StoreContext)
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
        fire.doSignInWithEmailAndPassword(userInfo.form.email.value, userInfo.form.password.value).then((data) => {
            actions.setLoginState(data.user.uid)
        }
        ).catch((error) => {
            actions.setErrorState({error: error})
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
                        <Button onClick={(e) => props.switch("register", e)} value="Register" type="button" />
                    </div>
                </form>
            </FormPopUp>
        </AuxDiv>
    )
}

export default Login