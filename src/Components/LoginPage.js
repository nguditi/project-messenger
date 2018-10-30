import React from 'react'
import {Container,Button} from 'reactstrap'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import ChatRoom from './ChatRoom'
// import GoogleButton from 'react-google-button' // optional

const LoginPage = ({ firebase, auth }) => (
    <Container>
        <Button  // <GoogleButton/> button can be used instead
            onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
        >Login With Google </Button>
        <div>
            <h2>Auth</h2>
            {
                !isLoaded(auth) ? <span>Loading...</span> : isEmpty(auth) ? <span>Not Authed</span> : <ChatRoom/>
            }
        </div>
    </Container>
)
export default compose(firebaseConnect(), connect(({ firebase: { auth } }) => ({ auth })))(LoginPage)