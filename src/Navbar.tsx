import * as React from 'react';

import {Route, Switch} from 'react-router';
import {NavLink} from 'react-router-dom';

import {AppBar, Divider, Drawer, Hidden, IconButton} from 'material-ui';
import {List, ListItem, ListItemText, Theme, Toolbar, Typography} from 'material-ui';
import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import MenuIcon from '@material-ui/icons/Menu';

import HeroCreate from './components/HeroCreate';
import HeroEdit from './components/HeroEdit';
import HeroTable from './components/HeroTable';
import Home from './components/Home';
import Login from "./components/Login";
import NoMatch from './components/NoMatch';


// https://reacttraining.com/react-router/web/guides/philosophy
// https://material-ui-next.com/demos/


// https://jaysoo.ca/2015/09/26/typed-react-and-redux/
// https://github.com/IrfanBaqui/react-router-v4-tutorial/blob/master/09_Router_Config/src/App.js
// https://github.com/tastejs/todomvc/tree/master/examples/typescript-react/js
// https://github.com/mui-org/material-ui/tree/v1-beta/docs/src/pages/demos
// https://github.com/mui-org/material-ui/tree/v1-beta/examples/create-react-app-with-typescript
// https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
// https://medium.com/@liangchun/integrating-material-ui-next-with-your-react-typescript-project-80847f7eab64


// https://itnext.io/using-advanced-design-patterns-to-create-flexible-and-reusable-react-components-part-3-render-d7517dfe72bc


// authentication https://levelup.gitconnected.com/react-and-redux-with-typescript-da0c37537a79
// https://www.javascriptstuff.com/react-ajax-best-practices/
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://github.com/bitinn/node-fetch

// https://github.com/tastejs/todomvc/blob/master/examples/typescript-react/js/interfaces.d.ts
// https://hackernoon.com/why-im-switching-from-angular-to-react-and-redux-in-2018-cb48be00fda7
// https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
// https://stackoverflow.com/questions/23481061/reactjs-state-vs-prop


// http://davidwalsh.name/fetch
// https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript

// https://github.com/tastejs/todomvc/blob/master/examples/typescript-react/js/interfaces.d.ts
// https://hackernoon.com/why-im-switching-from-angular-to-react-and-redux-in-2018-cb48be00fda7
// https://medium.com/@tmkelly28/handling-multiple-form-inputs-in-react-c5eb83755d15
// https://stackoverflow.com/questions/23481061/reactjs-state-vs-prop

// https://github.com/react-navigation/react-navigation/tree/master/src/views/Drawer


// https://redux.js.org/basics/example-todo-list
// https://stackoverflow.com/questions/41386427/showing-snackbar-with-react-redux

// https://redux.js.org/basics/example-todo-list#entry-point
// https://www.valentinog.com/blog/react-redux-tutorial-beginners/



interface INavbarProps {
    title: string
}

interface INavbarState {
    mobileOpen: boolean,
}

class Navbar extends React.Component<INavbarProps & WithStyles<ComponentClassNames>, INavbarState> {

    constructor(props: any) {
        super(props);

        this.state = {mobileOpen: false};

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
    }

    public handleDrawerToggle() {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    public handleDrawerClose() {
        this.setState({mobileOpen: false});
    };

    public render() {

        const {classes, title = ''} = this.props;

        const drawer = (
            <div role="button" onClick={this.handleDrawerClose}>
                <List>
                    <NavLink className={classes.navLink} to="/" activeClassName="active">
                        <ListItem button={true}>
                            <ListItemText>Home</ListItemText>
                        </ListItem>
                    </NavLink>
                </List>
                <List>
                    <NavLink className={classes.navLink} to="/heroes" activeClassName="active">
                        <ListItem button={true}>
                            <ListItemText>Heroes</ListItemText>
                        </ListItem>
                    </NavLink>
                </List>
                <List>
                    <NavLink className={classes.navLink} to="/hero" activeClassName="active">
                        <ListItem button={true}>
                            <ListItemText>Add Hero</ListItemText>
                        </ListItem>
                    </NavLink>
                </List>
                <Divider/>
                <List>
                    <ListItem button={true}>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>
            </div>
        );

        const routes = (
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/Login" component={Login}/>
                <Route path="/hero/:id" component={HeroEdit}/>
                <Route path="/hero" component={HeroCreate}/>
                <Route path="/heroes" component={HeroTable}/>
                <Route component={NoMatch}/>
            </Switch>
        );

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="sticky">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap={true}>
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp={true}>
                    <Drawer
                        variant="temporary"
                        anchor='left'
                        open={this.state.mobileOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown={true} implementation="css">
                    <Drawer
                        variant="permanent"
                        open={true}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {routes}
                </main>
            </div>
        );
    }
}

type ComponentClassNames =
    | 'root'
    | 'appBar'
    | 'navIconHide'
    | 'toolbar'
    | 'content'
    | 'drawerPaper'
    | 'navLink'


const drawerWidth = 240;

const style = (theme: Theme): StyleRules<ComponentClassNames> => ({

    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        position: 'fixed',
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    navLink: {
        textDecoration: 'none'
    },
});

export default withStyles(style, {withTheme: true})<INavbarProps>(Navbar);