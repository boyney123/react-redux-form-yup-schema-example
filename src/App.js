import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import formApp from './reducers'
import Form from './Form';

let store = createStore(formApp);

ReactDOM.render(
    <Provider store={store}>
        <Form />
    </Provider>,
    document.getElementById('root')
);
