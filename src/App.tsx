import * as React from 'react';

import {connect} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import createMuiTheme from 'material-ui/styles/createMuiTheme';

import Login from './components/Login';
import Navbar from './components/Navbar';
import Notification from './components/Notification';

import {AuthService} from './AuthService';
import {AuthUser} from './models/AuthUser';

interface IAuthenticationProps {
    authentication: { authUser: AuthUser, authenticated: false }
}

const mapStateToProps = (state: IAuthenticationProps) => {
    return {authUser: state.authentication.authUser, authenticated: state.authentication.authenticated};
};

interface IAuthenticatedProps {
    authUser: AuthUser,
    authenticated: false
}

class App extends React.Component<IAuthenticatedProps, {}> {

    private authService = new AuthService();

    constructor(props: any) {

        super(props);

        this.authService.checkLogin();
    }

    public renderAuth() {

        if (this.props.authenticated) {
             return (
                 <Navbar />
            );
        }

        // todo on refresh im landing here before navbar is shown
        return (
            <Login/>
        );
    }

    public render() {

        const theme = createMuiTheme({
            /*palette: {
                type: 'dark',
            },*/
        });

        return (
            <div  className='App'>
                <MuiThemeProvider theme={theme}>
                    {this.renderAuth()}
                    <Notification/>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(App);