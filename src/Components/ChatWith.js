import React,{Component} from 'react';
import '../Utils/style.scss'
import { connect } from 'react-redux';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {chooseUser, togleStateStar} from "../Actions";

class ChatWith extends Component {

    handleClick =(e)=>{
        this.props.togleStateStar(this.props.chatWith.id,this.props.isStar)
    }

    render() {

        if (!this.props.chatWith.avatar || !this.props.chatWith.name)
        {
            this.props.chooseUser(this.props.chatWith.id)
        }
        let active = (this.props.isStar === true) ? "starActive" : "star"

        return(
            <div className ="chat-header clearfix">
                <img src={this.props.chatWith.avatar} alt="avatar" />
                <div className="chat-about">
                    <div className="chat-with">Chat with {this.props.chatWith.name}</div>
                </div>
                <FontAwesomeIcon className={active} icon="star" onClick={(e)=>this.handleClick(e)}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        chatWith: state.chatWith,
        isStar: state.star,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        togleStateStar: (id,star) => {
            dispatch(togleStateStar(id, star))
        },
        chooseUser:(id)=>{
            dispatch(chooseUser(id))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatWith)