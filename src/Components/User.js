import React,{Component} from 'react';
import '../Utils/style.scss'
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {chooseUser} from "../Actions";
import {withRouter} from "react-router-dom";
class User extends Component {

    onClickUser()
    {
        if (this.props.chatWith.id !== this.props.user.key) {
            this.props.history.push(this.props.user.key)
            this.props.chooseUser(this.props.user.key)
        }
    }

    render() {
        let state = <FontAwesomeIcon icon="circle" className="online"/>
        let descript = 'online';
        if (!this.props.user.value.online.status) {
            state = <FontAwesomeIcon icon="circle" className="offline"/>
            let now = new Date();
            let then = new Date(this.props.user.value.online.lastonline);
            let long = new Date(now.getTime() - this.props.user.value.online.lastonline);
            let second = Math.round(long / 1000);
            let minute = Math.round(second / 60);
            let hour = Math.round(minute / 60);
            let date = Math.round(hour / 24);
            descript = `offline ${
                (date > 7) ? `since ${then.toLocaleDateString()}` :
                    (date === 1) ? `1 day ago` :
                        (date > 1) ? `${date} days ago` :
                            (hour === 1) ? `1 hour ago` :
                                (hour > 1) ? `${hour} hours ago` :
                                    (minute === 1) ? `1 minute ago` :
                                        (minute > 1) ? `${minute} minutes ago` :
                                            `a few seconds ago`}`
        }
        return (
            <li className="clearfix">
                <img src={this.props.user.value.avatarUrl} alt="avatar"/>
                <div className="about">
                    <div className="name" onClick={()=>this.onClickUser()}>{this.props.user.value.displayName}</div>
                    <div className="status">
                        {state}{descript}
                    </div>
                </div>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        chatWith: state.chatWith,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        chooseUser:(id)=>{
            dispatch(chooseUser(id))
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(User))