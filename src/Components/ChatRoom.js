import React from 'react';
import {Container} from 'reactstrap';
import MessagesContainer from '../Containers/MessagesContainer'
import InputContainer from '../Containers/InputContainer'

const ChatRoom = () =>(
    <Container className="center">
        <h3>Messenger</h3>
        <MessagesContainer />
        <InputContainer/>
    </Container>
)

export default ChatRoom;