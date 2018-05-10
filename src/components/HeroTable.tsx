import * as React from 'react';

import {connect} from 'react-redux';

import {NavLink} from 'react-router-dom';

import {Paper, Table, TableBody, TableCell, TableHead, TableRow, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {HeroModel} from '../HeroModel';
import {HeroService} from '../HeroService';

import {sendNotification} from '../actions/index';

const mapDispatchToProps = (dispatch: any) => {
    return {
        sendNotification: (message: string) => dispatch(sendNotification(message))
    };
};

interface IHeroesState {
    heroes: HeroModel[],
}

interface INotificationProps {
    sendNotification: (message: string) => void
}

class HeroTable extends React.Component<INotificationProps & WithStyles<ComponentClassNames>, IHeroesState> {

    private heroService = new HeroService;

    constructor(props: any) {
        super(props);
        this.state = {heroes:[]};
    }

    public componentDidMount() {
        this.heroService.getHeroes()
            .then(response => {
                this.setState({
                    heroes: response
                });
            })
            .catch(error => {
                this.props.sendNotification(error.message);
            });
    }

    public render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <h1>Heroes</h1>
                <Paper>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell numeric={true}>Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.heroes.map((hero: HeroModel) => {
                                return (
                                    <TableRow key={hero.id}>
                                        <TableCell><NavLink className={classes.navLink} to={`/hero/${hero.id}`}
                                                            activeClassName='active'>{hero.name}</NavLink></TableCell>
                                        <TableCell numeric={true}>{hero.age}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

type ComponentClassNames =
    | 'root'
    | 'table'
    | 'navLink'

const style = (theme: Theme): StyleRules<ComponentClassNames> => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },

    table: {
        minWidth: 700,
    },

    navLink: {
        textDecoration: 'none',
        color: 'black',
        fontWeight: 'bold'
    },

});


export default connect(null, mapDispatchToProps)(withStyles(style)(HeroTable));