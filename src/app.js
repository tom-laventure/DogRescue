import React, { useContext, useEffect, useState } from 'react'
import Homepage from './Containers/HomePage/HomePage';
import { Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store/StoreContext'
import Layout from './hoc/Layout/Layout';
import Auth from './Components/Auth/Auth';
import ApplicantCreation from './Containers/ApplicantCreation/ApplicantCreation';
import UserAccount from './Containers/Account/UserAccount/UserAccount';
import AdminAccount from './Containers/Account/AdminAccount/AdminAccount';


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
    return (
        <Layout>
            {authView}
            <Switch>
                <Route path="/admin-account" component={AdminAccount}/>
                <Route path="/user-account" component={UserAccount}/>
                <Route path="/create-user" component={ApplicantCreation}/>
                <Route path="/" component={Homepage} />
            </Switch>
        </Layout>
    );
}

export default App