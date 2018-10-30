import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from "./firebase";
import 'bootstrap/dist/css/bootstrap.css';

const initialState = window.__INITIAL_STATE__ // set initial state here
const store = configureStore(initialState)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
)
