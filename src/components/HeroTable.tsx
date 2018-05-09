import * as React from 'react';

import {NavLink} from "react-router-dom";

import {Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {HeroModel} from '../HeroModel';
import {HeroService} from '../HeroService';

interface IMessageState {
    open: boolean,
    message?: string;
}

interface IHeroesState {
    heroes: HeroModel[],
}

class HeroTable extends React.Component<WithStyles<ComponentClassNames>, IHeroesState & IMessageState> {

    private heroService = new HeroService;

    constructor(props: any) {
        super(props);
        this.state = {heroes:[], open: false};
    }

    public handleMessage(m: string) {
        this.setState({open: true, message: m});
    }

    public componentDidMount() {
        this.heroService.getHeroes()
            .then(response => {
                this.setState({
                    heroes: response
                });
            })
            .catch(error => {
                this.handleMessage(error.message);
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

                <Snackbar
                    open={this.state.open}
                    autoHideDuration={8000}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}

                    message={<span id='message-id'>{this.state.message}</span>}
                />
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


export default withStyles(style)(HeroTable);