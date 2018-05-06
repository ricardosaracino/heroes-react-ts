import * as React from 'react';

import {Button, Snackbar, TextField, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {IHeroProps} from './interfaces';


interface IHeroState {
    id?: string,
    name: string,
    age: string,
    open: boolean,
    message?: string;
}

// https://github.com/tastejs/todomvc/blob/master/examples/typescript-react/js/interfaces.d.ts
// https://hackernoon.com/why-im-switching-from-angular-to-react-and-redux-in-2018-cb48be00fda7
// https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
// https://stackoverflow.com/questions/23481061/reactjs-state-vs-prop

class HeroCreate extends React.Component<IHeroProps & WithStyles<ComponentClassNames>, IHeroState> {

    public state: IHeroState;

    private heroesUrl = 'http://localhost:8030/heroes';

    constructor(props: any) {
        super(props);

        this.state = {name: '', age: '', open: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleOpen(m: string) {
        this.setState({open: true, message: m});
    }

    public handleChange(event: React.FormEvent<any>) {
        const input: any = event.target;

        this.setState({[input.name]: input.value});
    }

    public handleSubmit(event: React.FormEvent<any>) {

        this.addHero()
            .then(response => {
                this.setState({
                    id: response.id
                });

            })
            .catch(error => {
                this.handleOpen(error.message);
            });
    }

    /**
     * POST
     * @returns {Promise<HeroModel>}
     */
    public addHero(): Promise<any> {

        return fetch(this.heroesUrl, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({name: this.state.name, age: this.state.age})
        }).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }


    public render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <h1>Add Hero</h1>

                <TextField
                    label='Name'
                    name={'name'}
                    className={classes.input}
                    margin='normal'
                    onChange={this.handleChange}

                />

                <TextField
                    label='Age'
                    name={'age'}
                    className={classes.input}
                    margin='normal'
                />

                <Button
                    variant='raised'
                    color='primary'
                    className={classes.button}

                    onClick={this.handleSubmit}
                >
                    Save
                </Button>

                <Snackbar
                    open={this.state.open}
                    autoHideDuration={8000}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}

                    message={<span id="message-id">{this.state.message}</span>}
                />
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

export default withStyles(style)<IHeroProps>(HeroCreate);