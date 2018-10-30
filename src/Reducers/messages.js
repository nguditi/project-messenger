import {ADD_MESSAGE,SEND_MESSAGE} from  '../Constants/ActionTypes'

const message = (state = [], action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let tmp = {
                id: action.message.id,
                text: action.message.text,
                time: action.message.time,
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
                let tmp = [...state,
                    message(undefined, action)]
                return tmp;
            }
        default:
            return state
    }
};

export default messages;
