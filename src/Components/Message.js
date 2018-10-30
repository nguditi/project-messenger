import React from 'react';
const Message = (msg) => {
    let date = new Date(msg.time);
    let datenow = new Date()
    let strDay = date.toLocaleTimeString();
    if (date.toDateString() !==  datenow.toDateString())
    {
        strDay += ' ' + date.toLocaleDateString() ;
    }
    else
    {
        strDay += ' today'
    }
    return(
    <div>
        {/*<img src={msg.author.avatar} alt="avatar"/>*/}
        {/*<b>{msg.author.name}</b>*/}
        <span>{msg.text}</span>
        <p className="text-sm-center">{strDay}</p>
    </div>
    )
}

export default Message;