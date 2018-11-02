import React,{Component} from 'react';
import '../Utils/style.scss'
import { connect } from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ChatWith extends Component {

    render() {
        return(
            <div className ="chat-header clearfix">
            <img src={this.props.chatWith.avatar} alt="avatar" />
            <div className="chat-about">
                <div className="chat-with">Chat with {this.props.chatWith.name}</div>
            </div>
            <FontAwesomeIcon icon="star"/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        chatWith: state.chatWith,
    }
};


export default connect(mapStateToProps)(ChatWith)