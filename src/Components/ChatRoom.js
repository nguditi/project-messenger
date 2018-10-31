import React,{Component} from 'react';
import {Container,Button} from 'reactstrap';
import  UserContainer from  '../Containers/UserContainer'
import MessagesContainer from '../Containers/MessagesContainer'
import InputContainer from '../Containers/InputContainer'
import {compose} from "redux";
import {withRouter} from 'react-router-dom';
import {firebaseConnect,isLoaded, isEmpty} from "react-redux-firebase";
import {connect} from 'react-redux'
import '../Utils/style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ChatRoom extends Component {

    componentWillReceiveProps()
    {
        if (isEmpty(this.props.auth))
            this.props.history.push('/');
    }

    componentWillMount()
    {
        if (!isLoaded(this.props.auth) && isEmpty(this.props.auth)) {
            this.props.history.push('/');
        }
    }


    logOut() {
        this.props.firebase.update(`users/${this.props.auth.uid}/online`,{status: false,
            lastonline: this.props.firebase.database.ServerValue.TIMESTAMP})
        this.props.firebase.logout()
    }

    render() {
        return(
            <Container>
                <h2 className = "text-center">Messenger</h2>
                <Button className = "float-right" color="danger" onClick={() => this.logOut()}
                >Logout </Button>
                <div>
                    <div className="people-list col-md-4" id="people-list">
                        <div className="search">
                            <input type="text" placeholder="search"/>
                            <FontAwesomeIcon icon="search"/>
                        </div>
                        <UserContainer/>
                    </div>
                {/*<MessagesContainer />*/}
                {/*<InputContainer/>*/}
                </div>
            </Container>)

    }
}


export default compose(firebaseConnect(),withRouter,connect(({ firebase: {auth}}) => ({auth})))(ChatRoom);