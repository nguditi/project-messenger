import React, {Component} from 'react'
import {Container, Button} from 'reactstrap'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect, isLoaded, isEmpty} from 'react-redux-firebase'
import ProtectPage from './ProtectPage'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// import GoogleButton from 'react-google-button' // optional

class LoginPage extends Component {

    async loginGG() {
        await this.props.firebase.login({provider: 'google', type: 'popup'})
        console.log(this.props.uid);
        this.props.firebase.update(`users/${this.props.uid}/online`,{status: true})
        this.render();
    }

    render() {
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

                <Button color="danger" onClick={() => this.loginGG()}
                ><FontAwesomeIcon icon={['fab', 'google-plus-g']} /> Login with google </Button>
            </Container>
        )
    }
}

export default compose(firebaseConnect(), connect(({firebase: {auth,auth:{uid}}}) => ({auth,uid})))(LoginPage)