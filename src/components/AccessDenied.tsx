import * as React from 'react';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

class AccessDenied extends React.Component<WithStyles<ComponentClassNames>, {}> {

    public render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <h1>Access Denied</h1>
            </div>
        );
    }
}

type ComponentClassNames =
    | 'root'

const style: StyleRules<ComponentClassNames> = {
    root: {
        width: '100%',
        overflowX: 'auto',
    },
};

export default withStyles(style)(AccessDenied);