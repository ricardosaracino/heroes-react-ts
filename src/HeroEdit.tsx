import * as React from 'react';

import {RouteComponentProps} from "react-router";

import {Button, Snackbar, TextField, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {HeroModel} from "./HeroModel";

interface IHeroState {

    hero: HeroModel,

    open: boolean,
    message?: string;
}

interface IRouteParams {
    id: string
}

// https://github.com/tastejs/todomvc/blob/master/examples/typescript-react/js/interfaces.d.ts
// https://hackernoon.com/why-im-switching-from-angular-to-react-and-redux-in-2018-cb48be00fda7
// https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
// https://stackoverflow.com/questions/23481061/reactjs-state-vs-prop

class HeroEdit extends React.Component<RouteComponentProps<IRouteParams> & WithStyles<ComponentClassNames>, IHeroState> {

    private heroesUrl = 'http://localhost:8030/heroes';

    constructor(props: any) {
        super(props);

        this.state = {hero: new HeroModel, open: false};

        // THIS WORKS
        this.state.hero.age = 'f';
        this.state.hero.name = 'f';

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
    }

    public componentDidMount() {
        this.getHero()
            .then(response => {

                // THIS DOES NOT WORK
                this.setState({hero: response});

                // THIS DOES NOT WORK
                // this.setState({hero: {...this.state.hero, name: 'asasdfasdfsadf'}});
            })
            .catch(error => {
                this.handleOpen(error.message); // body stream already read
            });
    }

    public handleOpen(m: string) {
        this.setState({open: true, message: m});
    }

    public handleChange(event: React.FormEvent<any>) {

        const input: any = event.target;

        // THIS DOES WORK
        this.setState({hero: {...this.state.hero, [input.name]: input.value}});
    }

    public handleSubmit(event: React.FormEvent<any>) {

        this.updateHero()
            .then(response => {
                console.log('udpated');
            })
            .catch(error => {
                this.handleOpen(error.message);
            });
    }

    public handleDelete(event: React.FormEvent<any>) {

        this.deleteHero()
            .then(response => {
               // router.push('/heroes')
            })
            .catch(error => {
                this.handleOpen(error.message);
            });
    }

    /**
     * GET
     * @returns {Promise<>}
     */

    public getHero(): Promise<HeroModel> {

        const id = this.props.match.params.id;

        return fetch(`${this.heroesUrl}/${id}`).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }

    /**
     * PUT
     * @returns {Promise<HeroModel>}
     */
    public updateHero(): Promise<any> {

        return fetch(this.heroesUrl, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.hero)
        }).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }

    /**
     * DELETE
     * @returns {Promise<HeroModel>}
     */
    public deleteHero(): Promise<any> {

        return fetch(this.heroesUrl, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.hero) // todo just need _rev & _id
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
                <h1>Edit Hero</h1>

                <TextField
                    label='Name'
                    name={'name'}
                    className={classes.input}
                    value={this.state.hero.name}
                    onChange={this.handleChange}

                />

                <TextField
                    label='Age'
                    name={'age'}
                    className={classes.input}
                    value={this.state.hero.age}
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

                <Button
                    variant='raised'
                    color='secondary'
                    className={classes.button}
                    onClick={this.handleDelete}
                >
                    Delete
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

export default withStyles(style)(HeroEdit);