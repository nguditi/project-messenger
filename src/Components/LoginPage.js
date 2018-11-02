import React, {Component} from 'react'
import {Container, Button} from 'reactstrap'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect, isEmpty} from 'react-redux-firebase'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withRouter} from "react-router-dom";
// import GoogleButton from 'react-google-button' // optional

class LoginPage extends Component {

    componentDidUpdate()
    {
        if(!isEmpty(this.props.auth)) {
            localStorage.setItem('hasAuth','true')
            this.props.history.push(`/messenger`)
        }
    }

    loginGG() {
         this.props.firebase.login({provider: 'google', type: 'popup'})
    }

    render() {
        return (
            <Container className="text-center">
                <h2>Authentication</h2>
                <div>
                    {
                        <span>You must login to access</span>
                    }
                </div>
                <Button color="danger" onClick={() => this.loginGG()}
                ><FontAwesomeIcon icon={['fab', 'google-plus-g']} /> Login with google </Button>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth,
    }
};


export default compose(firebaseConnect(),withRouter,connect(mapStateToProps))(LoginPage);