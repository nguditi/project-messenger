import {compose,applyMiddleware,createStore } from 'redux'
import { reactReduxFirebase,getFirebase } from 'react-redux-firebase'
import firebase from 'firebase'
import rootReducer from './Reducers'
import thunk from 'redux-thunk';

var firebaseConfig = {
    apiKey: "AIzaSyA0sq5nHIPThcO8tVAdCazqSoayLkzoyfw",
    authDomain: "messenger-1512569.firebaseapp.com",
    databaseURL: "https://messenger-1512569.firebaseio.com",
    projectId: "messenger-1512569",
    storageBucket: "messenger-1512569.appspot.com",
    messagingSenderId: "1000159405291"
};

const config = {
    userProfile: 'users', // firebase root where user profiles are stored
    firebaseStateName: 'firebase' // should match the reducer name ('firebase' is default)
}

export default function configureStore (initialState = {}){
    firebase.initializeApp(firebaseConfig)

    const createStoreWithFirebase =
        compose(reactReduxFirebase(firebase, config),
            applyMiddleware(thunk.withExtraArgument(getFirebase))
        )(createStore)


    const store = createStoreWithFirebase(rootReducer)

    return store;
}