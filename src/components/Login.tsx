import * as React from 'react';

import {connect} from 'react-redux';

import {RouteComponentProps} from 'react-router';

import {Button, TextField, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';


import {sendNotification} from '../actions/index';

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendNotification: (message: string) => dispatch(sendNotification(message))
    };
};

interface INotificationProps {
    sendNotification: (message: string) => void
}

interface ILoginState {
    username: string,
    password: string,
}

class Login extends React.Component<INotificationProps & RouteComponentProps<{}> & WithStyles<ComponentClassNames>, ILoginState> {

    constructor(props: any) {
        super(props);

        this.state = {username: '', password: ''};

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: React.FormEvent<any>) {

        const input: any = event.target;

        this.setState({[input.name]: input.value});
    }

    public handleSubmit(event: React.FormEvent<any>) {

        console.log('handleSubmit');
    }

    public render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <h1>Login</h1>

                <TextField
                    label='Username'
                    name='username'
                    className={classes.input}
                    value={this.state.username}
                    onChange={this.handleChange}

                />

                <TextField
                    label='Password'
                    name='password'
                    type='password'
                    className={classes.input}
                    value={this.state.password}
                    onChange={this.handleChange}
                />

                <Button
                    variant='raised'
                    color='primary'
                    className={classes.button}
                    onClick={this.handleSubmit}
                >
                    Save
                </Button>
            </div>
        );
    }
}

// this isn't necessary
type ComponentClassNames =
    | 'root'
    | 'input'
    | 'button'

const style = (theme: Theme): StyleRules<ComponentClassNames> => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },

    input: {
        margin: theme.spacing.unit,
    },

    button: {
        margin: theme.spacing.unit,
    },
});

export default connect(null, mapDispatchToProps)(withStyles(style)(Login));