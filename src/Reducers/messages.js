import {ADD_CHUNK_MESSAGE, ADD_MESSAGE, CLEAR_MESSAGES} from '../Constants/ActionTypes'

const message = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let tmp = {
                id: action.message.id,
                text: action.message.text,
                time: action.message.time,
                author: action.message.author
            }
            return tmp;
        default:
            return state
    }
}

const messages = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            if (state.map(m => m.id).includes(action.id)) {
                return state;
            }else{
                let tmp = [...state, message(undefined, action)]
                return tmp;
            }
        case ADD_CHUNK_MESSAGE:
            let tmp = [];
            Object.values(action.messages).forEach((msg) => {
                tmp = [...tmp, msg]
            })
            return tmp;
        case CLEAR_MESSAGES:
            return [];
        default:
            return state
    }
};

export default messages;
