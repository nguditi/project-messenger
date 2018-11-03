import { combineReducers } from 'redux'
import chatWith from './user'
import messages from './messages'
import { firebaseReducer } from 'react-redux-firebase'
import image from './Image'

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    chatWith,
    messages,
    image,
    // chatroom,
    // user,
})
export default rootReducer;
