import React,{Component} from 'react';
import { connect } from 'react-redux';
import Message from "../Components/Message";
import { ToastContainer, toast } from 'react-toastify';

const mapStateToProps = (state) => ({
        messages: state.messages,
        idSender: state.firebase.auth.uid,
        idchatWith: state.chatWith.id
});

class MessagesContainer extends Component{

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }

    ShowToast = (ms) => {
        toast.info(`You have message from: ${ms.author.name}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    render()
    {
        console.log(this.props.messages)
        let listMsgs = this.props.messages.filter((ms)=>{
            if ((ms.author.id === this.props.idSender) || (ms.author.id === this.props.idchatWith)) {
                return true
            }
            else {
                this.ShowToast(ms)
                return false
            }
        }).map((msg) => {
            return (<Message key={msg.id} {...msg} idSender={this.props.idSender}/>);
        })
        return (
            <div className="chat-history" id ="a-scroll">
                <ul className="list-unstyled">
                    {listMsgs}
                </ul>
                <div style={{ float:"left", clear: "both" }}
                     ref={(el) => { this.messagesEnd = el; }}>
                </div>
                <ToastContainer/>
            </div>)
    }
}


export default connect(mapStateToProps)(MessagesContainer)