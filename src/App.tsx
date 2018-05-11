import * as React from 'react';

import {connect} from 'react-redux';

import {BrowserRouter} from 'react-router-dom';

import {CookieComponentProps, withCookies} from 'react-cookie';


import Navbar from './Navbar';

import Notification from './components/Notification';

import {loginUser} from './actions/index';


const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: () => dispatch(loginUser())
    };
};

interface ILoginProps {
    loginUser: () => void
}

class App extends React.Component<CookieComponentProps & ILoginProps, {}> {

    constructor(props: any) {
        super(props);

        if (props.cookies.get('auth-user')) {
            props.loginUser();
        }
    }

    /**
     * Was having issues if BrowserRouter was not in here
     * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
     * @returns {any}
     */
    public render() {
        return (
            <div className='App'>
                <BrowserRouter>
                    <Navbar title={'Tour of Heroes'}/>
                </BrowserRouter>
                <Notification/>
            </div>
        );
    }
}

export default withCookies(connect(null, mapDispatchToProps)(App));