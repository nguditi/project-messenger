import React,{Component} from 'react';
import { connect } from 'react-redux';
import Message from "../Components/Message";

const mapStateToProps = (state) => ({
        messages: state.messages,
        idSender: state.firebase.auth.uid,
});

class MessagesContainer extends Component{

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render()
    {
        let listMsgs = this.props.messages.map((msg) => {
            return (<Message key={msg.id} {...msg} idSender={this.props.idSender}/>);
        })
        return (
            <div className="chat-history" id ="a-scroll">
                <ul className="list-unstyled">
                    {listMsgs}
                </ul>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>)
    }
}


export default connect(mapStateToProps)(MessagesContainer)