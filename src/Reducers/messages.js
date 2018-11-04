import {ADD_CHUNK_MESSAGE, ADD_MESSAGE, CLEAR_MESSAGES} from '../Constants/ActionTypes'

const messages = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            {
                let id = Object.values(action.message)[0].id
                if (state.map(message => message.id).includes(id)) {
                    return state;
                }
                let tmp = state;
                if (action.message) {
                    Object.values(action.message).forEach((msg) => {
                        tmp = [...tmp, msg]
                    })
                }
                return tmp
            }
        case ADD_CHUNK_MESSAGE:
            let tmp = [];
            if (action.messages)
            {
                Object.values(action.messages).forEach((msg) => {
                    tmp = [...tmp, msg]
                })
            }
            tmp.splice(tmp.length - 1,1)
            return tmp;
        case CLEAR_MESSAGES:
            return [];
        default:
            return state
    }
};

export default messages;
