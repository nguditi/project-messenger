import React from 'react';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from 'react-redux'
import User from "../Components/User";
import '../Utils/style.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const mapStateToProps = (state) => ({
    users: state.firebase.ordered.users
});

const UserContainer = ({users}) => {
    let listUser;
    if (users) {
        listUser = users.map((user) => {
            return (<User key={user.key} user={user}/>);
        })
    }
    return (
        <ul id = "a-scroll">
            {listUser}
        </ul>
    )
}

export default compose(firebaseConnect(['users']),connect(mapStateToProps))(UserContainer);