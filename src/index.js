import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from "./firebase";
import 'bootstrap/dist/css/bootstrap.css';
import './Utils/style.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch,faCircle} from '@fortawesome/free-solid-svg-icons'
import { fab} from '@fortawesome/free-brands-svg-icons'

library.add(faSearch,faCircle,fab)
const initialState = window.__INITIAL_STATE__ // set initial state here
const store = configureStore(initialState)

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root')
)
