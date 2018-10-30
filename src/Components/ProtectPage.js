import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';

class ProtectPage extends Component{

    componentWillMount()
    {
        this.props.history.push('messenger');
    }

    render()
    {
        return(<div></div>)
    }
}

export default withRouter(ProtectPage)