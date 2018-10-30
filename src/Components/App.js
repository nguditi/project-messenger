import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../firebase'
import ChatRoom from './ChatRoom'
import LoginPage from "./LoginPage";

const initialState = window.__INITIAL_STATE__ // set initial state here
const store = configureStore(initialState)

export default () => (
    <Provider store={store}>
        <LoginPage/>
    </Provider>
)