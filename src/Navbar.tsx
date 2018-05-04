/* tslint:disable */

import * as React from 'react';

import {AppBar, IconButton} from 'material-ui';

import Toolbar from 'material-ui/Toolbar';

import Typography from 'material-ui/Typography';

import Button from 'material-ui/Button';

import MenuIcon from '@material-ui/icons/Menu';

import {StyleRules, withStyles, WithStyles} from 'material-ui/styles/index';

import Drawer from 'material-ui/Drawer';

import Divider from 'material-ui/Divider';

import List from 'material-ui/List';


import {otherMailFolderListItems, mailFolderListItems} from './titledata';
import Hero from './Hero';


interface INavbarProps {
    title: string,
}

type ComponentClassNames =
    | 'root'
    | 'flex'
    | 'appBar'
    | 'menuButton'
    | 'drawerPaper'
    | 'primary'
    | 'toolbar'
    | 'content'


const drawerWidth = 240;

// const style: StyleRules<ComponentClassNames> = (theme : Theme) = ({


const style: StyleRules<ComponentClassNames> = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },

    appBar: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    },

    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },


    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },

    toolbar:  {},//theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.default,
        // padding: theme.spacing.unit * 3,
    },

    primary: {},
};

// https://github.com/mui-org/material-ui/tree/v1-beta/docs/src/pages/demos
// https://material-ui-next.com/demos/app-bar/
// https://material-ui-next.com/demos/drawers/
// https://medium.com/@liangchun/integrating-material-ui-next-with-your-react-typescript-project-80847f7eab64

class Navbar extends React.Component<INavbarProps & WithStyles<ComponentClassNames>, {}> {

    public render() {

        const {classes, title = ''} = this.props;

        return (
            <div className={classes.root}>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>

                        </IconButton>
                        <Typography className={classes.flex} variant="title" color="inherit">
                            {title}
                        </Typography>
                        <Button color="inherit">Login</Button>

                    </Toolbar>
                </AppBar>

                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >

                    <Divider/>
                    <List>{mailFolderListItems}</List>
                    <Divider/>
                    <List>{otherMailFolderListItems}</List>
                </Drawer>

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Hero name={'Logan'}/>
                </main>
            </div>
        );
    }
}

export default withStyles(style)<INavbarProps>(Navbar);