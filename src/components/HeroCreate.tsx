import * as React from 'react';

import {connect} from 'react-redux';

import {RouteComponentProps} from 'react-router';

import {Button, TextField, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {HeroService} from '../HeroService';
import {HeroModel} from '../models/HeroModel';

import {sendNotification} from '../actions/index';

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendNotification: (message: string) => dispatch(sendNotification(message))
    };
};

interface INotificationProps {
    sendNotification: (message: string) => void
}

interface IHeroState {
    hero: HeroModel,
}

class HeroCreate extends React.Component<INotificationProps & RouteComponentProps<{}> & WithStyles<ComponentClassNames>, IHeroState> {

    private heroService = new HeroService;

    constructor(props: any) {
        super(props);

        this.state = {hero: new HeroModel};

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public handleChange(event: React.FormEvent<any>) {

        const input: any = event.target;

        this.setState({hero: {...this.state.hero, [input.name]: input.value}});
    }

    public handleSubmit(event: React.FormEvent<any>) {

        this.heroService.addHero(this.state.hero)
            .then(response => {
                this.props.history.push('/heroes');

                this.props.sendNotification('addHero: ' + response.name);
            })
            .catch(error => {
                this.props.sendNotification('addHero: ' + error.message);
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

export default connect(null, mapDispatchToProps)(withStyles(style)(HeroCreate));