import {CLEAR_IMAGE, ADD_IMAGE,ADD_PREIMAGE} from '../Constants/ActionTypes'

const initial = {
    inputImg: [],
    preImg: []
}

const image = (state = initial, action) => {
    switch (action.type) {
        case CLEAR_IMAGE:
        {
            let tmp={
                inputImg: [],
                preImg: []
            }
            return tmp
        }
        case ADD_IMAGE: {
            let inputImg = state.inputImg.concat(action.img)
            let preImg = state.preImg
            return {inputImg, preImg}
        }
        case ADD_PREIMAGE:
            let preImg = state.preImg.concat(action.img)
            let inputImg = state.inputImg
            return {inputImg,preImg}
        default:
            return state
    }
};

export default image;
