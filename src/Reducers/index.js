import { combineReducers } from 'redux'
import chatroom from './chatroom'
import user from './user'
import messages from './messages'
import { firebaseReducer } from 'react-redux-firebase'

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    // messages,
    // chatroom,
    // user,
})
export default rootReducer;
