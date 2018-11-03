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
        submitMessage: (text,img,idchatWith) => {
            let textReal = text.replace('<br>', "");
            if (textReal.trim().length !== 0 || img.length > 0) {
                dispatch(sendMessage(textReal,img,idchatWith));
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputMessage);
