import * as React from 'react';

import {Route, Switch} from 'react-router';
import {NavLink} from 'react-router-dom';

import {AppBar, Divider, Drawer, List, ListItem, ListItemText, Theme, Toolbar, Typography} from 'material-ui';
import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import HeroCreate from './HeroCreate';
import HeroEdit from './HeroEdit';
import HeroTable from './HeroTable';
import Home from './Home';
import NoMatch from './NoMatch';






// https://material-ui-next.com/demos/app-bar/
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


interface INavbarProps {
    title: string,
}

class Navbar extends React.Component<INavbarProps & WithStyles<ComponentClassNames>, {}> {


    public render() {

        const {classes, title = ''} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            {title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar}/>
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
                    </List> <List>
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
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route path="/" component={Home} exact={true}/>
                        <Route path="/hero/:id" component={HeroEdit}/>
                        <Route path="/hero" component={HeroCreate}/>
                        <Route path="/heroes" component={HeroTable}/>
                        <Route component={NoMatch}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

type ComponentClassNames =
    | 'root'
    | 'appBar'
    | 'drawerPaper'
    | 'navLink'
    | 'content'
    | 'toolbar'


const drawerWidth = 240;

const style = (theme: Theme): StyleRules<ComponentClassNames> => ({

    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },

    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },

    navLink: {
        textDecoration: "none"
    },

    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },

    toolbar: theme.mixins.toolbar,
});

export default withStyles(style)<INavbarProps>(Navbar);