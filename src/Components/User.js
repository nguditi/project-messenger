import React from 'react';
import '../Utils/style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const User = (user) => {
    let state = <FontAwesomeIcon icon="circle" className="online" />
    let descript = 'online';
    if (!user.value.online.status)
    {
        state = <FontAwesomeIcon icon="circle" className="offline"/>
        let now = new Date();
        let then = new Date(user.value.online.lastonline);
        let long = new Date(now.getTime() - user.value.online.lastonline);
        let second = Math.round(long/1000);
        let minute = Math.round(second/60);
        let hour = Math.round(minute/60);
        let date = Math.round(hour/24);
        descript = `offline ${
            (date > 7) ? `since ${then.toLocaleDateString()}` :
            (date === 1) ? `1 day ago` :
                (date > 1) ? `${date} days ago` :
                    (hour === 1) ? `1 hour ago` :
                        (hour > 1) ? `${hour} hours ago` :
                            (minute === 1) ? `1 minute ago` :
                                (minute > 1) ? `${minute} minutes ago`:
                                    `a few seconds ago`}`
    }
    return(
        <li className="clearfix">
            <img src={user.value.avatarUrl} alt="avatar"/>
            <div className="about">
                <div className="name">{user.value.displayName}</div>
                <div className="status">
                    {state}{descript}
                </div>
            </div>
        </li>
    )
}

export default User;