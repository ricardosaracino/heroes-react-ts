import * as React from 'react';

import Hero from './Hero';
import Navbar from './Navbar';


// https://github.com/tastejs/todomvc/tree/master/examples/typescript-react/js


class App extends React.Component {
    public render() {
        return (

            <div className="App">

                <Navbar title={'Tour of Heroes'}/>

                <div>
                    <Hero name={'Logan'}/>
                </div>
            </div>
        );
    }
}

export default App;
