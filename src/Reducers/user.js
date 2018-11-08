import {CHANGE_USER} from  '../Constants/ActionTypes'

const initState = {
    id: '0',
    name:'ghost...',
    avatar:'https://png.pngtree.com/svg/20160506/anonymous_avatar_182327.png'
}

const chatWith = (state = initState, action) => {
     switch (action.type) {
        case CHANGE_USER:
            let tmp ={
                id: action.id,
                name:action.name,
                avatar:action.avatar
            }
            return tmp;
        default:
            return state
    }
}

export default chatWith