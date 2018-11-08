import React from 'react';
import {compose} from "redux";
import {firebaseConnect} from "react-redux-firebase";
import {connect} from 'react-redux'
import User from "../Components/User";
import '../Utils/style.scss'

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
            let priValue = 100
            let thisStat = users.find(obj => obj.key === idSender)
            if (thisStat) {
                listUser = users.sort((b, a) => {
                        if (thisStat.value.stat) {
                            let astat = thisStat.value.stat[`${a.key}`]
                            let bstat = thisStat.value.stat[`${b.key}`]
                            if ((b.value.online.status !== true && a.value.online.status === true)||
                                (b.value.online.status === true && a.value.online.status !== true))
                            {
                                return (b.value.online.status !== true)? 1: -1
                            }
                            else if (astat && bstat) {
                                if (astat.lastChat && bstat.lastChat) {
                                    return ((astat.star === true ? priValue : 1) * (astat.lastChat) -
                                        (bstat.star === true ? priValue : 1) * (bstat.lastChat))
                                }
                                else if (!astat.lastChat && bstat.lastChat)
                                {
                                    return -1
                                }
                                else if (astat.lastChat && !bstat.lastChat)
                                {
                                    return 1
                                }
                                else{
                                    return (astat.star === true ? priValue : 1) - (bstat.star === true ? priValue : 1)
                                }
                            }
                            else if (!astat || !bstat) {
                                return !bstat ? 1 : -1
                            }
                            else {
                                return 1
                            }
                        }
                        else {
                            return 1
                        }
                    })
                    .map((user) => {
                        return <User key={user.key} user={user}/>
                    })
            }
        }
    }
    return (
        <ul id = "a-scroll">
            {listUser}
        </ul>
    )
}

const mapStateToProps = (state) => ({
    users: state.firebase.ordered.users,
    searchText: state.searchBar,
    idSender: state.firebase.auth.uid,
});

export default compose(firebaseConnect(['users']),connect(mapStateToProps))(UserContainer);