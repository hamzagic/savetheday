import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './pages/Register/index';
import Login from './pages/Login';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}