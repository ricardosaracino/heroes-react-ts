import * as React from 'react';

import {Component} from 'react';

import {RouteComponentProps} from "react-router";

import {connect} from 'react-redux';
import {AuthUser} from './models/AuthUser';


interface IAuthenticationProps {
    authentication: { authUser: AuthUser, authenticated: false }
}

interface IAuthenticatedProps {
    authUser: AuthUser,
    authenticated: false
}

export default function (ComposedComponent: any, roles?: any) {

    class Authentication extends Component<IAuthenticatedProps & RouteComponentProps<any>, {}> {

        public componentWillMount() {
            console.log(roles);

            if (!this.props.authenticated) {
                this.props.history.push('/denied');
            }
        }

        public componentWillUpdate(nextProps: IAuthenticatedProps) {

            const hasAccess = roles.filter((role :string) => {
                return nextProps.authUser.roles.indexOf(role) !== -1;
            }).length !== 0;

            if (!hasAccess) {
                this.props.history.push('/denied');
            }
        }

        public render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps(state: IAuthenticationProps) {
        return {authenticated: state.authentication.authenticated, authUser: state.authentication.authUser};
    }

    return connect(mapStateToProps)(Authentication);
}