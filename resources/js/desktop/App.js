import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Header from './Header'
import Index from "./Index";
import Register from "./Register";
import Login from "./Login";
import Verification from './Verification'

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'


function PrivateRouteLogedin ({redirect : redirect,component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed == false
                ? <Component {...props} />
                : <Redirect to={{pathname: redirect, state: {from: props.location}}} />}
        />
    )
}

function PrivateRouteLogedinNo ({redirect : redirect,component: Component, authed, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => authed == true
                ? <Component {...props} />
                : <Redirect to={{pathname: redirect, state: {from: props.location}}} />}
        />
    )
}

export default function App() {
    const authed = localStorage.getItem('user') != null ? true : false;
    return (
        <React.Fragment>
            <Router>
                <Header />
                <Switch>
                    <Route path='//' compon ent={Index} />
                    <PrivateRouteLogedin authed={authed} path='/register' component={Register} redirect='/'/>
                    <PrivateRouteLogedin authed={authed} path='/login' component={Login} redirect='/'/>
                    <PrivateRouteLogedinNo authed={authed} path='/verification' component={Verification} redirect='/login'/>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}

