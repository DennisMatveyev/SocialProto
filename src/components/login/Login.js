import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";


const LoginForm = (props) => {
    // HOC reduxForm provides in the props a lot of different attributes
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={'input'} name={'email'} placeholder={'email'} />
            </div>
            <div>
                <Field component={'input'} name={'password'} placeholder={'password'} type={'password'} />
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'} type={'checkbox'} />remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

// Every form must have unique name (in this case it is 'login')
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    let onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    };

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div>
               <h2>Sign In Form</h2>
               <LoginReduxForm onSubmit={onSubmit} />
           </div>
};

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, {login})(Login);
