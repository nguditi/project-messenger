import React, { Component } from 'react';
import {InputGroup,InputGroupAddon,Input,Button} from 'reactstrap';

class InputMessenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText:''
        };
    }

    render()
    {
        return(
        <InputGroup>
            <Input type="text" placeholder="Say something..." value = {this.state.inputText} onChange={e => this.setState({ inputText: e.target.value })}/>
            <InputGroupAddon addonType="append">
                <Button color="success" onClick = {()=>{this.props.submitMessage(this.state.inputText)}}>Send</Button>
            </InputGroupAddon>
        </InputGroup>
        )
    }
}
export default InputMessenger;