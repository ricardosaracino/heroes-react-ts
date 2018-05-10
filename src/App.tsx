import * as React from 'react';

import Navbar from './Navbar';

import Notification from './components/Notification';

class App extends React.Component {
    public render() {
        return (
            <div className='App'>
                <Navbar title={'Tour of Heroes'}/>
                <Notification/>
            </div>
        );
    }
}

export default App;