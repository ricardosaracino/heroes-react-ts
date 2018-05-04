import * as React from "react";


import {FlatButton} from 'material-ui';

import {lightBaseTheme, MuiThemeProvider} from 'material-ui/styles';

import getMuiTheme from 'material-ui/styles/getMuiTheme';


interface IHeroProps {
    id: string,
    name: string,
}

export class Hero extends React.Component<IHeroProps, {}> {

    public render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>


                <FlatButton label={"Save"}/>
            </MuiThemeProvider>
        );
    }
}