import React from 'react';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from 'react-redux'
import User from "../Components/User";
import '../Utils/style.scss'

const mapStateToProps = (state) => ({
    users: state.firebase.ordered.users,
    searchText: state.searchBar,

});

const UserContainer = ({users,searchText}) => {
    let listUser;
    if (users) {
        if (searchText.trim().length !== 0) {
            const filterusers = users.filter((user) => {
                return user.value.displayName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            })
            listUser = filterusers.map((user) => {
                return (<User key={user.key} user={user}/>);
            })
        }
        else
        {
            listUser = users.map((user) => {
                return (<User key={user.key} user={user}/>);
            })
        }
    }
    return (
        <ul id = "a-scroll">
            {listUser}
        </ul>
    )
}

export default compose(firebaseConnect(['users']),connect(mapStateToProps))(UserContainer);