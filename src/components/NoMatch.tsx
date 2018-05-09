import * as React from 'react';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';


// this isn't necessary
type ComponentClassNames =
    | 'root'

const style: StyleRules<ComponentClassNames> = {
    root: {
        marginLeft: 60,
    },
};

class NoMatch extends React.Component<WithStyles<ComponentClassNames>, {}> {

    public render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <h1>Page not found</h1>
            </div>
        );
    }
}

export default withStyles(style)(NoMatch);