import React, { createContext, useReducer, useEffect, useState } from 'react'
import { Reducer, initialState } from './Reducer'
import { useActions } from './Actions'
import Firebase from './Firebase'
import firebase from 'firebase'

const StoreContext = createContext(initialState);

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    const actions = useActions(dispatch)
    const fire = new Firebase();
    // const database = firebase.database()

    useEffect(() => {
        console.log(state)
    }, [state])
    

    useEffect(() => {
        if (!state.user.loaded && state.user.adminLevel === 0) {
            fire.getUsersDogs(fire.getCurrentUserID(), (data) => {
                console.log("get users dogs", data)
            })
        }

        //check if there is a user logged in, if so get that users 
        fire.authStateChange((user) => {
            if (!user && !state.user.loaded) {
                actions.setCurrentUser({ adminLevel: 0, loaded: true })
            }
            else if (!state.user.loaded) {
                fire.getUserProfileInfo(user.uid).then((doc) => {
                    if (doc.data() !== undefined) {
                        actions.setCurrentUser(doc.data())
                    }
                    else {
                        actions.setCurrentUser({ adminLevel: 0, loaded: true })
                    }
                })
            }
        })
    }, [state.user])
    

    return (
        <StoreContext.Provider value={{ state, dispatch, actions, fire, firebase }}>
            {children}
        </StoreContext.Provider >
    )
}

export { StoreProvider, StoreContext } 