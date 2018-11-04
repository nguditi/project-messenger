import React from 'react';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from 'react-redux'
import User from "../Components/User";
import '../Utils/style.scss'

const mapStateToProps = (state) => ({
    users: state.firebase.ordered.users,
    searchText: state.searchBar,
    idSender: state.firebase.auth.uid,
});

const UserContainer = ({users,searchText,idSender}) => {
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
            let thisStat = users.find(obj => obj.key === idSender).value.stat
            let priValue = 100
            listUser = [].concat(users)
                .sort((b, a) => {
                let astat = thisStat[`${a.key}`]
                let bstat =  thisStat[`${b.key}`]
                if (astat && bstat)
                {
                    // console.log(a.key,b.key)
                    return ((astat.star === true ? priValue : 1) * (astat.lastChat?astat.lastChat:0) >
                            (bstat.star === true ? priValue : 1) * (bstat.lastChat?bstat.lastChat:0))
                }
                else if (astat || bstat)
                {
                    return astat?true:false
                }
                else {
                    return true
                }
            })
                .map((user) =>{
                return <User key={user.key} user={user}/>
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