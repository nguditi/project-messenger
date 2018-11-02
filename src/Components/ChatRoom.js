import '../Utils/style.scss'
import {compose} from "redux";
import ChatWith from  './ChatWith'
import {connect} from 'react-redux'
import React,{Component} from 'react';
import {Container,Button} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {setOnline,logout,chooseUser} from "../Actions";
import UserContainer from  '../Containers/UserContainer'
import InputContainer from '../Containers/InputContainer'
import MessagesContainer from '../Containers/MessagesContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {firebaseConnect,isLoaded, isEmpty} from "react-redux-firebase";


class ChatRoom extends Component {

    componentWillReceiveProps()
    {
        if (this.props.auth.isEmpty)
             this.props.history.push('/');
    }

    componentWillMount()
    {
        if (!this.props.auth.isLoaded && this.props.auth.isEmpty ) {
            this.props.history.push('/');
        }
        if (this.props.uid) {
            this.props.setOnline()
            this.props.chooseUser(this.props.uid)
        }
    }

    logOut() {
        if (this.props.uid) {
            this.props.logout()
        }
    }

    render() {
        return(
            <Container>
                <h2 className = "text-center">Messenger</h2>
                <div className ="col-md-12 d-inline-block">
                    <Button className = "float-right" color="danger" onClick={() => this.logOut()}>Logout </Button>
                </div>

                <div>
                    <div className="people-list col-md-4" id="people-list">
                        <div className="search">
                            <input type="text" placeholder="search"/>
                            <FontAwesomeIcon icon="search"/>
                        </div>
                        <UserContainer/>
                    </div>

                    <div className ="chat col-md-8">
                        <ChatWith/>
                        <MessagesContainer/>
                        <InputContainer/>
                    </div>
                </div>
            </Container>)

    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
        uid: state.firebase.auth.uid,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setOnline: () => {
            dispatch(setOnline())
        },
        logout: ()=>{
            dispatch(logout())
        },
        chooseUser:(id)=>{
            dispatch(chooseUser(id))
        }
    }
}

export default compose(firebaseConnect(),withRouter,connect(mapStateToProps,mapDispatchToProps))(ChatRoom);