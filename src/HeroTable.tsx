import * as React from 'react';

import {Paper, Snackbar, Table, TableBody, TableCell, TableHead, TableRow, Theme} from 'material-ui';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import {IHero} from './interfaces';


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

    public getHeroes(): Promise<IHero> {

        // http://davidwalsh.name/fetch
        // https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript

        return fetch(this.heroesUrl).then(response => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });
    }

    public componentDidMount() {

        this.getHeroes()
            .then(response => {
                this.setState({
                    heroes: response
                });
            })
            .catch(error => {
                console.log(error);

                this.handleOpen(error.message);
            });
    }

    public render() {

        const {classes} = this.props;

        return (
            <div className={classes.root}>

                <h1>Heroes</h1>

                <Paper className={classes.paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell numeric={true}>Age</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.heroes.map((hero: IHero) => {
                                return (
                                    <TableRow key={hero.id}>
                                        <TableCell>{hero.name}</TableCell>
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

                    message={<span id="message-id">{this.state.message}</span>}
                />
            </div>
        );
    }
}

type ComponentClassNames =
    | 'root'
    | 'paper'
    | 'table'

const style = (theme: Theme): StyleRules<ComponentClassNames> => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },

    paper: {},

    table: {
        minWidth: 700,
    },
});


export default withStyles(style)(HeroTable);