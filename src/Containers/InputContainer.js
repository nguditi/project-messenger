import { connect } from 'react-redux';
import InputMessage from '../Components/InputMessage'
import {sendMessage} from "../Actions";

const mapStateToProps = (state) => {
    return {
        chatWith:state.chatWith
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitMessage: (text,idchatWith) => {
            if (text.trim().length !== 0) {
                dispatch(sendMessage(text,idchatWith));
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputMessage);
