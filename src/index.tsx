import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {createStore} from 'redux';

import {Provider} from 'react-redux';

import {CookiesProvider} from 'react-cookie';

import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './reducers/index';

ReactDOM.render(
    <CookiesProvider>
        <Provider store={createStore(rootReducer)}>
            <App/>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root') as HTMLElement
);

registerServiceWorker();