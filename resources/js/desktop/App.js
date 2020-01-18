import React, {useState , useEffect} from 'react';
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
} from 'react-router-dom'
import axios from "axios";
import URL from "../url";
import ShowAd from "./ShowAd";
import AddAd from "./addAd";


export default function App() {
    return (
        <React.Fragment>
            <Router>
                <Header />
                <Switch>
                    <Route exact path='//' component={Index} />
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/verification' component={Verification}/>
                    <Route exact path='/addadvertising' component={AddAd}/>
                    <Route exact path='/advertisings/:id' component={ShowAd}/>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}

