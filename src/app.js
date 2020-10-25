import React, { useContext, useEffect, useState } from 'react'
import Homepage from './Containers/HomePage/HomePage';
import { Switch, Route } from 'react-router-dom';
import { StoreContext } from './Store/StoreContext'
import Layout from './hoc/Layout/Layout';
import Auth from './Components/Auth/Auth';
import ApplicantCreation from './Containers/ApplicantCreation/ApplicantCreation';
import ApplicantConfirmation from './Containers/ApplicantCreation/ApplicantConfirmation/ApplicantConfirmation';
import UserAccount from './Containers/Account/UserAccount/UserAccount';
import AdminAccount from './Containers/Account/AdminAccount/AdminAccount';
import MessagePage from './Containers/MessagePage/MessagePage';
import Loading from './Containers/Loading/Loading';
import ConfirmAdminAccount from './Containers/Account/AdminAccount/CreateAdminAccount/ConfirmAdminAccount/ConfirmAdminAccount';
import CreateAdminAccount from './Containers/Account/AdminAccount/CreateAdminAccount/CreateAdminAccount';


const App = () => {
    const { state, actions, fire } = useContext(StoreContext)

    useEffect(() => {
        if (state.user !== null) {
            if (state.user.adminLevel === 0) {
                fire.getUsersDogs(fire.getCurrentUserID().uid, (data) => {
                    console.log(data)
                })
            }
        }
    }, [state.user])

    let authView;
    let authorized;
    if (fire.getCurrentUserID()) {
        authorized = MessagePage
    }
    else {
        authorized = Loading
    }

    //check if there is a user logged in, if so get that users 
    fire.authStateChange((user) => {
        if (!user) {

        }
        else {
            if (state.user == null) {
                fire.getProfileInfo(user.uid, (data) => {
                    actions.setCurrentUser(data)
                })
            }
        }
    })



    if (state.authPopUp) {
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
                <Route path="/confirm-account/:profileId" component={ApplicantConfirmation} />
                <Route path="/create-rescue-cordinator" component={CreateAdminAccount} />
                <Route path="/confirm-rescue-cordinator/:profileId" component={ConfirmAdminAccount} />
                <Route path="/" component={Homepage} />
            </Switch>

        </Layout>
    );
}

export default App