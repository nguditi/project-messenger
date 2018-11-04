import {CHANGE_STAR} from  '../Constants/ActionTypes'


const star = (state = false, action) => {
    switch (action.type) {
        case CHANGE_STAR:
            let tmp = action.stat.star
            return tmp;
        default:
            return state
    }
}

export default star