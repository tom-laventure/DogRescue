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
import './app.css'
import PrivateRoute from './Components/Routes/PrivateRoute';

const App = () => {
    const { state, actions, fire } = useContext(StoreContext)


    // useEffect(() => {
    //     if (!state.user.loaded && state.user.adminLevel === 0) {
    //         fire.getUsersDogs(fire.getCurrentUserID(), (data) => {
    //             console.log("get users dogs", data)
    //         })
    //     }

    //     //check if there is a user logged in, if so get that users 
    //     fire.authStateChange((user) => {
    //         if (!user && !state.user.loaded) {
    //             actions.setCurrentUser({ adminLevel: 0, loaded: true })
    //         }
    //         else if (!state.user.loaded) {
    //             fire.getUserProfileInfo(user.uid).then((doc) => {
    //                 if (doc.data() !== undefined) {
    //                     actions.setCurrentUser(doc.data())
    //                 }
    //                 else {
    //                     actions.setCurrentUser({ adminLevel: 0, loaded: true })
    //                 }
    //             })
    //         }
    //     })
    // }, [state.user])

    let authView;

    if (state.authPopUp) {
        authView = <Auth />
    }
    return (
        <Layout>
            {authView}
            {state.loading ? <Loading /> :
                <Switch>
                    <PrivateRoute path="/admin-account" component={AdminAccount} authLevel={1} />
                    <PrivateRoute path="/user-account" component={UserAccount} authLevel={0} />
                    <PrivateRoute path="/create-user" component={ApplicantCreation} authLevel={1} />
                    <Route path="/message" component={MessagePage} />
                    <Route path="/confirm-account/:profileId" component={ApplicantConfirmation} />
                    <PrivateRoute path="/create-rescue-cordinator" component={CreateAdminAccount} />
                    <Route path="/confirm-rescue-cordinator/:profileId" component={ConfirmAdminAccount} />
                    <Route path="/" component={Homepage} />
                </Switch>}
        </Layout>
    );
}

export default App