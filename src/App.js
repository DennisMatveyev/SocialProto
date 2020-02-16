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


class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if (!this.props.initialized) {
            // return some Preloader
        }

        return (
            <div className='app-wrapper'>

                <HeaderContainer/>

                <Nav/>

                <div className='app-wrapper-content'>

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
                    </Switch>

                </div>

            </div>
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
