import * as React from 'react';

import {Route, Switch} from 'react-router';

import RequireAuth from './Authentication';

import AccessDenied from "./components/AccessDenied";
import HeroCreate from './components/HeroCreate';
import HeroEdit from './components/HeroEdit';
import HeroTable from './components/HeroTable';
import Home from './components/Home';
import Login from './components/Login';
import NoMatch from './components/NoMatch';
import Secured from './components/Secured';

export default (
    <Switch>
        <Route path="/" component={RequireAuth(Home)} exact={true}/>
        <Route path="/denied" component={AccessDenied}/>
        <Route path="/login" component={Login}/>
        <Route path="/hero/:id" component={HeroEdit}/>
        <Route path="/hero" component={HeroCreate}/>
        <Route path="/heroes" component={HeroTable}/>
        <Route path="/secured" component={RequireAuth(Secured,['super'])}/>
        <Route component={NoMatch}/>
    </Switch>
);