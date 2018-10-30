import React from 'react';
import { connect } from 'react-redux';
import Message from "../Components/Message";

const mapStateToProps = (state) => ({
        messages: state.messages
});

const MessagesContainer = ({messages,dispatch}) => {
    let listMsgs = messages.map((msg)=> {
     return(<Message key={messages.id} {...msg}/>);
    })
    return (listMsgs);
}


export default connect(mapStateToProps)(MessagesContainer)