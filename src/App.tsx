import * as React from 'react';
import './App.css';

import {Hero} from './Hero';
import {Navbar} from './Navbar';


// https://github.com/tastejs/todomvc/tree/master/examples/typescript-react/js


class App extends React.Component {
    public render() {
        return (

            <div className="App">

                <Navbar/>

                <Hero name={"Locag"} id={"1"}/>
            </div>
        );
    }
}

export default App;
