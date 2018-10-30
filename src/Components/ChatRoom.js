import React,{Component} from 'react';
import {Container,Button} from 'reactstrap';
import MessagesContainer from '../Containers/MessagesContainer'
import InputContainer from '../Containers/InputContainer'
import {compose} from "redux";
import {withRouter} from 'react-router-dom';
import {firebaseConnect,isLoaded, isEmpty} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";

class ChatRoom extends Component {

    componentWillReceiveProps()
    {
        console.log(this.props.auth)
        if (isEmpty(this.props.auth))
            this.props.history.push('/');
    }

    componentWillMount()
    {
        console.log("Mount",this.props.auth)
        if (!isLoaded(this.props.auth) && isEmpty(this.props.auth)) {
            console.log("mount",this.props.auth)
            this.props.history.push('/');
        }
    }

    render() {
        return(
        <Container className="text-center">
            <h3>Messenger</h3>
            <Button color="danger"
                    onClick={() => {
                        this.props.firebase.logout()
                    }}
            >Logout </Button>
            {/*<MessagesContainer />*/}
            {/*<InputContainer/>*/}
        </Container>)
    }
}

export default compose(firebaseConnect(),withRouter,connect(({ firebase: { auth} }) => ({ auth })))(ChatRoom);