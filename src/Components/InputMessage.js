import React, { Component } from 'react';
import '../Utils/style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DivEdit from './DivEdit'
import {clearImg,addImage,addPreImage} from "../Actions";
import connect from "react-redux/es/connect/connect";

class InputMessenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText:'',
        };
    }
    handleChosen(event)
    {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let preImgs = this.props.preImg.concat(e)
                this.props.addPreImage(preImgs)
            }
            reader.readAsDataURL(event.target.files[0])
            this.props.addImage(event.target.files[0])
            this.refs.sendbtn.focus();
        }

    }
    HandlePressKey(e)
    {
        if (e.key === 'Enter' && e.shiftKey) {
            let tmp = this.state.inputText +'\n'
            this.setState({inputText:tmp})
        }
        else if (e.key === 'Enter') {
            this.props.submitMessage(this.state.inputText,this.props.inputImg,this.props.chatWith.id)
            this.setState({ inputText: ''})
            this.props.clearImg()
        }
    }

    submitMessage(text,image,chatWith)
    {
        this.props.submitMessage(text,image,chatWith.id)
        this.setState({inputText: ''})
        this.props.clearImg()
    }
    render()
    {
        return(
            <div className="chat-message clearfix">
                {/*<textarea className="message-to-send" id="message-to-send"*/}
                          {/*value = {this.state.inputText} onChange={e => this.setState({ inputText: e.target.value })}*/}
                          {/*onKeyPress={(e)=>this.HandlePressKey(e)}>*/}
                {/*</textarea>*/}
                <DivEdit
                        onChange={(e)=>{this.setState({inputText: e.target.value})}}
                         onKeyPress={(e)=>{this.HandlePressKey(e)}}
                         tabIndex="0"/>
                {/*<img src={this.state.image}/>*/}

                <div className="inputfile" >
                <label htmlFor="file">
                    <FontAwesomeIcon icon="image" size="2x"/>
                </label>
                <input type="file" id="file" accept="image/*" ref="fileUploader" onChange={(e) => this.handleChosen(e)}/>
                </div>

                <button  ref={'sendbtn'} className="float-right" onClick = {()=>{this.submitMessage(this.state.inputText,this.props.inputImg,this.props.chatWith)}}>Send</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        inputImg: state.image.inputImg,
        preImg: state.image.preImg
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearImg: ()=>{
            dispatch(clearImg())
        },
        addImage: (img)=>{
            dispatch(addImage(img))
        },
        addPreImage:(img)=>{
            dispatch(addPreImage(img))
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(InputMessenger)