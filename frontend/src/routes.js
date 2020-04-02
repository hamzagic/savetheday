import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './pages/Register/index';
import Login from './pages/Login';
import NewCase from './pages/NewCase';
import Cases from './pages/Cases';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/case" component={NewCase} />
                <Route path="/cases" component={Cases} />
            </Switch>
        </BrowserRouter>
    );
}