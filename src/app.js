import React, { useContext, useEffect, useState } from 'react'
import Homepage from './Containers/HomePage/HomePage';
import { Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store/StoreContext'
import AttendancePoll from './Containers/AttendancePoll/AttendancePoll';
import Layout from './hoc/Layout/Layout';
import Auth from './Components/Auth/Auth';
import CreateGroupPopUp from './Components/Poll/Groups/CreateGroupPopUp/CreateGroupPopUp';


const App = () => {
    const { state, actions, fire, axiosInstance } = useContext(StoreContext)
    const [auth, setAuth] = useState(false)
    const req = axiosInstance.setRequestInterceptor(req => {
        actions.setErrorState(null)
        return req;
    })
    const res = axiosInstance.setResponseInterceptor(error => {
        actions.setErrorState(null)
    })
    let authView;
    let createGroup;
    useEffect(() => {
        return () => {
            axiosInstance.removeReqInterceptor(req);
            axiosInstance.removeResInterceptor(res);
        }
    }, [req, res])


    fire.authStateChange((user) => {
        if (!user) {
            setAuth(true)
            if (state.user != null) {
                actions.setCurrentUser(null)
            }
        }
        else {
            setAuth(false)
            if (state.user == null) {
                actions.setCurrentUser(user)
            }
        }
    })



    if (auth) {
        authView = <Auth />
    }
    else if (state.createGroup) {
        createGroup = <CreateGroupPopUp />
    }
    return (
        <Layout>
            {authView}
            {createGroup}
            <Switch>
                <Route path="/poll" component={AttendancePoll} />
                <Route path="/" component={Homepage} />
            </Switch>
        </Layout>
    );
}

export default App