import {ADD_CHUNK_MESSAGE, ADD_MESSAGE, ADD_MORE_MESSAGE, CLEAR_MESSAGES} from '../Constants/ActionTypes'

const messages = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            {
                let tmp = state;
                if (action.message) {
                    Object.values(action.message).forEach((msg) => {
                        tmp = [...tmp, msg]
                    })
                }
                return tmp
            }
        case ADD_CHUNK_MESSAGE: {
            let tmp = [];
            if (action.messages) {
                Object.values(action.messages).forEach((msg) => {
                    tmp = [...tmp, msg]
                })
            }
            tmp.pop();
            return tmp;
        }
        case ADD_MORE_MESSAGE: {
            let tmp = [];
            if (action.messages) {
                Object.values(action.messages).forEach((msg) => {
                    tmp = [...tmp, msg]
                })
            }
            tmp.pop();
            if (tmp.length === 0)
                return state
            tmp = tmp.concat(state)
            return tmp;
        }
        case CLEAR_MESSAGES:
            return [];
        default:
            return state
    }
};

export default messages;
