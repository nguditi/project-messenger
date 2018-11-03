import {SEARCH_USER} from  '../Constants/ActionTypes'

const searchBar = (state = '', action) => {
    switch (action.type) {
        case SEARCH_USER:
            return action.text
        default:
            return state
    }
}

export default searchBar