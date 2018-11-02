import React, { Component } from 'react';
import '../Utils/style.scss'

class InputMessenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText:''
        };
    }

    submitMessage(input,chatWith)
    {
        this.setState({ inputText: ''})
        this.props.submitMessage(input,chatWith.id)
    }

    render()
    {
        return(
            <div className="chat-message clearfix">
                <textarea className="message-to-send" id="message-to-send"
                          value = {this.state.inputText} onChange={e => this.setState({ inputText: e.target.value })}
                          placeholder ="Type your message" rows="3"></textarea>
                <button onClick = {()=>{this.submitMessage(this.state.inputText,this.props.chatWith)}}>Send</button>
            </div>
        )
    }
}
export default InputMessenger;