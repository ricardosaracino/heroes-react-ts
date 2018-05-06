import * as React from 'react';

import {NavLink} from "react-router-dom";

import {Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {HeroModel} from './interfaces';

class HeroTable extends React.Component<WithStyles<ComponentClassNames>, {}> {

    public state = {
        heroes: [],
        open: false,
        message: '',
    };

    private heroesUrl = 'http://localhost:8030/heroes';

    constructor(props: any) {
        super(props);
    }

    public handleOpen(m : string) {
        this.setState({ open: true, message: m });
    }

    public componentDidMount() {
        this.getHeroes()
            .then(response => {
                this.setState({
                    heroes: response
                });
            })
            .catch(error => {
                this.handleOpen(error.message);
            });
    }

    /**
     * GET
     * @returns {Promise<HeroModel>}
     */
    public getHeroes(): Promise<HeroModel> {
        return fetch(this.heroesUrl).then(response => {

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
                                        <TableCell><NavLink className={classes.navLink} to={`/hero/${hero.id}`} activeClassName='active'>{hero.name}</NavLink></TableCell>
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
                    SnackbarContentProps={{
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