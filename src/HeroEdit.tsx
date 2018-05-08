import * as React from 'react';

import {RouteComponentProps} from 'react-router';

import {Button, Snackbar, TextField, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {HeroModel} from './HeroModel';
import {HeroService} from './HeroService';

interface IMessageState {
    open: boolean,
    message?: string;
}

interface IHeroState {
    hero: HeroModel,
}

interface IRouteParams {
    id: string
}
class HeroEdit extends React.Component<RouteComponentProps<IRouteParams> & WithStyles<ComponentClassNames>, IHeroState & IMessageState> {

    private heroService = new HeroService;

    constructor(props: any) {
        super(props);

        this.state = {hero: new HeroModel, open: false};

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
    }

    public componentDidMount() {

        if(this.props.match.params.id) {

            this.heroService.getHero(this.props.match.params.id)
                .then(response => {
                    this.setState({hero: response});
                })
                .catch(error => {
                    this.handleMessage(error.message); // body stream already read
                });
        }
    }

    public handleMessage(m: string) {
        this.setState({open: true, message: m});
    }

    public handleChange(event: React.FormEvent<any>) {

        const input: any = event.target;

        this.setState({hero: {...this.state.hero, [input.name]: input.value}});
    }

    public handleSubmit(event: React.FormEvent<any>) {

        this.heroService.updateHero(this.state.hero)
            .then(response => {
                this.props.history.push('/heroes');
            })
            .catch(error => {
                this.handleMessage(error.message);
            });
    }

    public handleDelete(event: React.FormEvent<any>) {

        this.heroService.deleteHero(this.state.hero)
            .then(response => {
                this.props.history.push('/heroes');
            })
            .catch(error => {
                this.handleMessage(error.message);
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

                    message={<span id='message-id'>{this.state.message}</span>}
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

export default (withStyles(style)(HeroEdit));