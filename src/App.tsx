import * as React from 'react';

import {connect} from 'react-redux';

import {CookieComponentProps, withCookies} from 'react-cookie';


import Login from "./components/Login";
import Notification from './components/Notification';
import Navbar from './Navbar';

import {loginUser} from './actions/index';
import {AuthUser} from "./models/AuthUser";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import createMuiTheme from "material-ui/styles/createMuiTheme";



interface IAuthenticationProps {
    authentication: { authUser: AuthUser, authenticated: false }
}

const mapActionToProps = (state: IAuthenticationProps) => {
    return {authUser: state.authentication.authUser, authenticated: state.authentication.authenticated};
};

interface IAuthenticatedProps {
    authUser: AuthUser,
    authenticated: false
}



const mapDispatchToProps = (dispatch: any) => {
    return {
        loginUser: (authUser: AuthUser) => dispatch(loginUser(authUser))
    };
};

interface ILoginProps {
    loginUser: (authUser: AuthUser) => void
}

class App extends React.Component<IAuthenticatedProps & ILoginProps & CookieComponentProps, {}> {

    constructor(props: any) {
        super(props);


        const authUser = props.cookies.get('auth-user');

        if (authUser) {
            // todo could refresh auth user
            props.loginUser(authUser);
        }
    }

    public renderAuth() {

        if (this.props.authenticated) {
             return (
                 <Navbar title={'Tour of Heroes'}/>
            );
        }

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


export default withCookies(connect(mapActionToProps, mapDispatchToProps)(App));