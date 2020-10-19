import React, { useContext, useEffect, useState } from 'react'
import Homepage from './Containers/HomePage/HomePage';
import { Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store/StoreContext'
import Layout from './hoc/Layout/Layout';
import Auth from './Components/Auth/Auth';
import ApplicantCreation from './Containers/ApplicantCreation/ApplicantCreation';
import UserAccount from './Containers/Account/UserAccount/UserAccount';
import AdminAccount from './Containers/Account/AdminAccount/AdminAccount';
import MessagePage from './Containers/MessagePage/MessagePage';
import Loading from './Containers/Loading/Loading';


const App = () => {
    const { state, actions, fire } = useContext(StoreContext)
    const [auth, setAuth] = useState(false)
    let authView;
    let authorized;
    if (state.user !== null) {
        authorized = MessagePage
    }
    else{
        authorized = Loading
    }

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
                <Route path="/admin-account" component={AdminAccount} />
                <Route path="/user-account" component={UserAccount} />
                <Route path="/create-user" component={ApplicantCreation} />
                <Route path="/message" component={authorized} />
                <Route path="/" component={Homepage} />
            </Switch>
        </Layout>
    );
}

export default App