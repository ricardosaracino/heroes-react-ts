import * as React from 'react';

import Navbar from './Navbar';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Navbar title={'Tour of Heroes'}/>
            </div>
        );
    }
}

export default App;