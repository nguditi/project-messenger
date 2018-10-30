import React, {Component} from 'react'
import {Container, Button} from 'reactstrap'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import ProtectPage from './ProtectPage'

// import GoogleButton from 'react-google-button' // optional

class LoginPage extends Component {

    async loginGG() {
        await this.props.firebase.login({provider: 'google', type: 'popup'})
        this.render();
    }

    render() {
        console.log("login",this.props.auth)
        return (
            <Container className="text-center">
                <h2>Authentication</h2>
                <div>
                    {
                        !isLoaded(this.props.auth) ? <span>Loading...</span>
                            : isEmpty(this.props.auth) ? <span>You must login to access</span>
                            : <ProtectPage/>
                    }
                </div>
                <Button color="primary"
                        onClick={() => this.loginGG()}
                >Login With Google </Button>
            </Container>
        )
    }
}

export default compose(firebaseConnect(), connect(({firebase: {auth}}) => ({auth})))(LoginPage)