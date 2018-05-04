import * as React from 'react';

import {AppBar, Tab, Tabs} from 'material-ui';

import {lightBaseTheme,  MuiThemeProvider} from 'material-ui/styles';

import getMuiTheme from 'material-ui/styles/getMuiTheme';

// https://material-ui-next.com/demos/app-bar/


export class Navbar extends React.Component {

    public render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>

                <AppBar title="Tour of Heroes">
                    <Tabs>
                        <Tab label="Item 1"/>
                    </Tabs>
                </AppBar>
            </MuiThemeProvider>
        );
    }
}

