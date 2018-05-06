import * as React from 'react';

import {TextField, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import { IHeroProps }  from './interfaces';

class Hero extends React.Component<IHeroProps & WithStyles<ComponentClassNames>, {}> {

    public static defaultProps: Partial<IHeroProps> = {
        age: 12
    };

    public render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <h1>Hero</h1>

                <TextField
                    label="Name"
                    className={classes.input}
                    margin="normal"
                />

                <TextField
                    label="Age"
                    className={classes.input}
                    margin="normal"
                />
            </div>
        );
    }
}

// this isn't necessary
type ComponentClassNames =
    | 'root'
    | 'input'


const style = (theme: Theme): StyleRules<ComponentClassNames> => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },

    input: {
        margin: theme.spacing.unit,
    },
});

export default withStyles(style)<IHeroProps>(Hero);