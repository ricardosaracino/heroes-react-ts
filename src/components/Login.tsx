import * as React from 'react';

import {connect} from 'react-redux';

import {Button, TextField, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {sendNotification} from '../actions/index';

import {AuthService} from "../AuthService";

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendNotification: (message: string) => dispatch(sendNotification(message)),
    };
};

interface INotificationProps {
    sendNotification: (message: string) => void
}

interface ILoginState {
    username: string,
    password: string,
}

class Login extends React.Component<INotificationProps & WithStyles<ComponentClassNames>, ILoginState> {

    private authService = new AuthService();

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

        this.authService.login(this.state.username, this.state.password)
            .catch(error => {
                this.props.sendNotification('login: ' + error.message);
            });
    }

    public render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <h1>Tour of Heroes</h1>

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
                    Login
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
        margin: '0 auto',
        width: '300px',
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