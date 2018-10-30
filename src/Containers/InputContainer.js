import { connect } from 'react-redux';
import InputMessage from '../Components/InputMessage'
import {sendMessage} from "../Actions";

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch,user) => {
    return {
        submitMessage: (text) => {
            if (text.trim().length !== 0) {
                dispatch(sendMessage(text,user));
            }
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputMessage);
