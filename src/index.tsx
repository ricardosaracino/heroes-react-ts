import * as React from 'react';
import * as ReactDOM from 'react-dom';


import {Provider} from 'react-redux';

import {CookiesProvider} from 'react-cookie';

import store from './store';


import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';




ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();