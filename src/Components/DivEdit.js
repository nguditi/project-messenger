import React, { Component } from 'react';
import '../Utils/style.scss'
import connect from "react-redux/es/connect/connect";
import {clearImg} from "../Actions";


class DivEdit extends Component{
    render(){
        let listimg = this.props.preImg ? this.props.preImg.map((img,index)=>
            {
                return(
                    <img key={index} src={img.currentTarget.result} alt="preview"
                             ref={(e)=>{this.choose = e}}
                             onClick={()=>this.handleClick()}
                    />
            )
                }
        ):null
        return(
            <div>
                <div
                    className="textarea"
                    ref={(ip) => { this.inputHtml = ip}}
                    onInput={this.emitChange}
                    onKeyPress={(e)=>this.keyPress(e)}
                    contentEditable
                    suppressContentEditableWarning
                >
                    {listimg}
                </div>
            </div>)

    }


    handleClick() {
        this.props.clearImg()
    }


    keyPress(e) {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
            }
            else {
                e.preventDefault()
                this.inputHtml.innerHTML = ''
            }
            this.props.onKeyPress(e)
        }
    }

    shouldComponentUpdate(nextProps){
        return nextProps.html !== this.inputHtml.innerHTML
    }

    emitChange=()=>{
        let html = this.inputHtml.innerHTML;
        if (this.props.onChange && html) {
            this.props.onChange({
                target: {
                    value: html
                }
            });
        }
    }
}

const mapStateToProps = (state) => {
    return{
        preImg: state.image.preImg
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearImg: () => {
            dispatch(clearImg())
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(DivEdit)