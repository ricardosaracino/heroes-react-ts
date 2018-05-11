import * as React from 'react';

import {connect} from 'react-redux';

import {StyleRules, WithStyles, withStyles} from 'material-ui/styles';

import {Theme} from 'material-ui';


interface IAuthenticationProps {
    authentication: {error: '', message: '', content: '', authenticated: false}
}

const mapStateToProps = (state: IAuthenticationProps) => {
    return {authenticated: state.authentication.authenticated};
};

interface IAuthenticatedProps{
    authenticated: false
}

class Secured extends React.Component<IAuthenticatedProps & WithStyles<ComponentClassNames>, {}> {

    constructor(props: any) {
        super(props);
    }

    public renderContent() {

        if (this.props.authenticated) {
            return (
                <h1>Secured</h1>
            );
        }

        return (
            <h1>Un-Secured</h1>
        );
    }

    public render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {this.renderContent()}
            </div>
        );
    }
}

type ComponentClassNames =
    | 'root'

const style = (theme: Theme): StyleRules<ComponentClassNames> => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    }
});

export default connect(mapStateToProps)(withStyles(style)(Secured));