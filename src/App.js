import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import './App.css';

import HeaderContainer from './components/header/HeaderContainer';
import Nav from './components/navbar/Nav';
import DialogsContainer from "./components/dialogs/DialogsContainer";
import UsersContainer from "./components/users/UsersContainer";
import ProfileContainer from "./components/profile/ProfileContainer";
import Login from "./components/login/Login";
import {initializeApp} from "./redux/app-reducer";
import NotesPage from "./components/notes/NotesPage";
import {Alert} from "./components/notes/Alert";
import {AlertState} from "./context/alert/AlertState";
import {FirebaseState} from "./context/firebase/FirebaseState";


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            // return some Preloader
        }

        return (
            /* Firebase and Alert States related to Notes app */
            <FirebaseState>
            <AlertState>
                <div className='app-wrapper'>

                    <HeaderContainer/>

                    <Nav/>

                    <div className='app-wrapper-content'>
                        <Alert />

                        <Switch>
                            <Route exact path={'/'}
                                   render={() => <Redirect to={'/profile'} />}
                            />
                            <Route path='/dialogs'
                                   render={() => <DialogsContainer/>}
                            />
                            <Route path='/profile/:userId?'
                                   render={() => <ProfileContainer/>}
                            />
                            <Route path='/users'
                                   render={() => <UsersContainer/>}
                            />
                            <Route path='/login'
                                   render={() => <Login/>}
                            />
                            /* Notes app implemented in FUNC style with HOOKS */
                            <Route path='/notes'
                                   render={() => <NotesPage />}
                            />
                        </Switch>

                    </div>

                </div>
            </AlertState>
            </FirebaseState>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});


export default compose(
    connect(mapStateToProps, { initializeApp }),
    withRouter
)(App);
