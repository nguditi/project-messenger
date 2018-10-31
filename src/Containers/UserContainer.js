import React from 'react';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from 'react-redux'
import User from "../Components/User";
import '../Utils/style.scss'

const mapStateToProps = (state) => ({
    users: state.firebase.ordered.users
});

const UserContainer = ({users}) => {
    let listUser;
    if (users) {
        listUser = users.map((user) => {
            return (<User key={user.key} {...user}/>);
        })
    }
    return (
        <ul>
            {listUser}
        </ul>
    )
}

export default compose(firebaseConnect(['users']),connect(mapStateToProps))(UserContainer);