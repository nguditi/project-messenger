import React, { Component } from 'react';
import '../Utils/style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import DivEdit from './DivEdit'
// import {clearImg,addImage,addPreImage} from "../Actions";
// import connect from "react-redux/es/connect/connect";

class InputMessenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText:'',
            preImg:[],
            inputImg:[],

        };
    }
    handleChosen(event)
    {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                let preImgs = this.state.preImg.concat(e)
                this.setState({preImg:preImgs})
            }
            reader.readAsDataURL(event.target.files[0])

            let tmp = this.state.inputImg.concat(event.target.files[0])
            this.setState({inputImg:tmp})

            this.refs.sendbtn.focus();
            event.target.value = null;
        }

    }
    HandlePressKey(e)
    {
        if (e.key === 'Enter' && e.shiftKey) {
            e.preventDefault()
            let tmp = this.state.inputText +'\n'
            this.setState({inputText:tmp})
        }
        else if (e.key === 'Enter') {
            e.preventDefault()
            this.props.submitMessage(this.state.inputText,this.state.inputImg,this.props.chatWith.id)
            this.setState({ inputText: ''})
            this.setState({inputImg:[],preImg:[]})
        }
    }

    handleClick = (e) => {
        let rm = e.target.getAttribute('data-key')
        let tmpPre = this.state.preImg
        tmpPre.splice(rm,1)
        let tmpIn = this.state.inputImg
        tmpIn.splice(rm,1)
        this.setState({inputImg:tmpIn,preImg:tmpPre})
    }

    submitMessage(text,image,chatWith)
    {
        this.props.submitMessage(text,image,chatWith.id)
        this.setState({inputText: ''})
        this.setState({inputImg:[],preImg:[]})
    }
    render()
    {
        let listimg = this.state.preImg.map((img,index)=>
            {
                return(
                    <img key={index} data-key={index} src={img.target.result} alt="preview"
                         onClick={(e)=>this.handleClick(e)}
                    />
                )
            }
        )
        return(
            <div className="chat-message clearfix">

                <textarea className="message-to-send" id="message-to-send"
                          value = {this.state.inputText}
                          onChange={e => this.setState({ inputText: e.target.value })}
                          onKeyPress={(e)=>this.HandlePressKey(e)}
                          rows="3">
                </textarea>

                {/*<DivEdit*/}
                        {/*onChange={(e)=>{this.setState({inputText: e.target.value})}}*/}
                         {/*onKeyPress={(e)=>{this.HandlePressKey(e)}}*/}
                         {/*tabIndex="0"/>*/}
                {/*<img src={this.state.image}/>*/}

                <div className="inputfile" >
                <label htmlFor="file">
                    <FontAwesomeIcon icon="image" size="2x"/>
                </label>
                <input type="file" id="file" accept="image/*" ref="fileUploader" onChange={(e) =>
                    this.handleChosen(e)}/>
                </div>

                {listimg}

                <button  ref={'sendbtn'} className="float-right" onClick = {
                    ()=>{this.submitMessage(this.state.inputText,this.state.inputImg,this.props.chatWith)}}>
                    Send</button>
            </div>
        )
    }
}

// const mapStateToProps = (state) => {
//     return{
//         inputImg: state.image.inputImg,
//         preImg: state.image.preImg
//     }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         // clearImg: ()=>{
//         //     dispatch(clearImg())
//         // },
//         // addImage: (img)=>{
//         //     dispatch(addImage(img))
//         // },
//         // addPreImage:(img)=>{
//         //     dispatch(addPreImage(img))
//         // }
//
//     }
// }

export default InputMessenger