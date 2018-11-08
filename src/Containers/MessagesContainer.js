import React,{Component} from 'react';
import { connect } from 'react-redux';
import Message from "../Components/Message";
import {loadMore} from "../Actions";


class MessagesContainer extends Component{


    isTop= () => {
        return this.chatBox.scrollTop === 0;
    }

    componentDidMount() {
        this.chatBox.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        this.chatBox.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        if (this.isTop()){
            this.props.loadMore(this.props.messages.length);
        }
    };

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior:"auto" });
    }

    render()
    {
        let listMsgs = this.props.messages.map((msg) => {
            return (<Message key={msg.id} {...msg} idSender={this.props.idSender}/>);
        })
        return (
            <div className="chat-history" id ="a-scroll" ref={(el) => { this.chatBox = el; }}>
                <ul className="list-unstyled">
                    {listMsgs}
                </ul>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>)
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages,
    idSender: state.firebase.auth.uid,
    idchatWith: state.chatWith.id
});

const mapDispatchToProps = (dispatch) => {
    return {
       loadMore:(lenght) =>
       {
           dispatch(loadMore(lenght))
       }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(MessagesContainer)