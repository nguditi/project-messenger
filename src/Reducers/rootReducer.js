import { combineReducers } from 'redux'
import chatWith from './user'
import messages from './messages'
import searchBar from './searchBar'
import star from './star'
import { firebaseReducer } from 'react-redux-firebase'
import image from './Image'

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    chatWith,
    messages,
    image,
    searchBar,
    star,
})
export default rootReducer;
