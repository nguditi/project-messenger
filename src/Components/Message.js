import React from 'react';
import '../Utils/style.scss'

const Message = (msg) => {

    let date = new Date(msg.time);
    let datenow = new Date()
    let strTime = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
    if (date.toDateString() !==  datenow.toDateString())
    {
        strTime += `, ${date.toLocaleDateString()}`
    }
    let listImg
    if (msg.media && msg.media.length > 0)
    {
        listImg = msg.media.map((img,index)=>{
            return(
                <img key={index} src={img} alt="pic"/>
            )})
    }

    if (msg.idSender === msg.author.id)
    {
        return(
            <li className="clearfix">
                <div className="message-data text-right">
                    <span className="message-data-time" >{strTime}</span> &nbsp; &nbsp;
                    <span className="message-data-name" >{msg.author.name}</span>
                    <img src={msg.author.avatar} alt="avatar" className="float-right ml-2" />
                </div>
                <span className="message my-message float-right">{msg.text}
                    {listImg}
                </span>
            </li>
        )
    }
    else {
        return(
            <li className="clearfix">
                <div className="message-data text-left">
                    <img src={msg.author.avatar} alt="avatar" className="float-left mr-2" />
                    <span className="message-data-name" >{msg.author.name}</span>
                    <span className="message-data-time" >{strTime}</span> &nbsp; &nbsp;
                </div>
                <span className="message other-message float-left">{msg.text}
                    {listImg}
                </span>
            </li>
        )
    }


}

export default Message;