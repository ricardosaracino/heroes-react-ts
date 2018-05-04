import * as React from 'react';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {TextField} from 'material-ui';


interface IHeroProps {
    id?: string,
    name: string,
    age?: number,
}

// this isn't necessary
type ComponentClassNames =
    | 'root'
    | 'textField'


const style: StyleRules<ComponentClassNames> = {
    root: {
        height: 200,
        width: 300,
        marginLeft: 60,
    },

    textField: {
        width: 200,
    },
};

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
                    className={classes.textField}
                    margin="normal"
                />

                <TextField
                    label="Age"
                    className={classes.textField}
                    margin="normal"
                />

            </div>
        );
    }
}

export default withStyles(style)<IHeroProps>(Hero);