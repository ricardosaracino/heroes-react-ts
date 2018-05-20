import * as React from 'react';

import {BrowserRouter} from 'react-router-dom';

import {CookieComponentProps, withCookies} from 'react-cookie';

import {connect} from 'react-redux';

import {RouteComponentProps} from 'react-router';
import {NavLink} from 'react-router-dom';

import {AppBar, Divider, Drawer, Hidden, IconButton} from 'material-ui';
import {List, ListItem, ListItemText, Theme, Toolbar, Typography} from 'material-ui';
import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import MenuIcon from '@material-ui/icons/Menu';

import {AuthUser} from '../models/AuthUser';

import {logoutUser} from '../actions/index';

import routes from '../routes';


interface IAuthenticationProps {
    authentication: { authUser: AuthUser, authenticated: false }
}

const mapStateToProps = (state: IAuthenticationProps) => {
    return {authUser: state.authentication.authUser, authenticated: state.authentication.authenticated};
};

interface IAuthenticatedProps {
    authUser: AuthUser,
    authenticated: false
}


const mapDispatchToProps = (dispatch: any) => {
    return {
        logoutUser: () => dispatch(logoutUser()),
    };
};

interface ILogoutProps {
    logoutUser: () => void
}

interface INavbarProps {
    title: string
}

interface INavbarState {
    mobileOpen: boolean,
}

class Navbar extends React.Component<IAuthenticatedProps & ILogoutProps & INavbarProps & CookieComponentProps & RouteComponentProps<any> & WithStyles<ComponentClassNames>, INavbarState> {

    constructor(props: any) {
        super(props);

        this.state = {mobileOpen: false};

        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    public handleDrawerToggle() {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    public handleDrawerClose() {
        this.setState({mobileOpen: false});
    };

    public handleLogout() {

        // todo   this.loginService.logout

        // stored as a string to null is returned as "null"
        // this.props.cookies!.set('auth-user', '');
        localStorage.removeItem('authUser');

        this.props.logoutUser();
    }

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
                    <ListItem button={true} onClick={this.handleLogout}>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <BrowserRouter>
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
            </BrowserRouter>
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
            position: 'fixed',
        },
    },
    content: {
        [theme.breakpoints.up('md')]: {
            marginLeft: drawerWidth,
        },
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    navLink: {
        textDecoration: 'none'
    },
});


export default withCookies(connect(mapStateToProps, mapDispatchToProps)(withStyles(style, {withTheme: true})(Navbar)));
