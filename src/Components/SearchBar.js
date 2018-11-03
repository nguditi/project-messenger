import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {Component} from "react";
import '../Utils/style.scss'
import {searchUser} from "../Actions";
import connect from "react-redux/es/connect/connect";

class SearchBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchText:'',
        };
    }

     handleSearch = async (e) =>{
         await this.setState({searchText: e.target.value})
         this.props.searchUser(this.state.searchText)
    }


    render() {
        return (
            <div className="search">
                <input type="text" value={this.state.searchText}
                       placeholder="search"
                       onChange={(e) => {this.handleSearch(e)}}/>
                <FontAwesomeIcon icon="search"/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchUser: (text) => {
            dispatch(searchUser(text))
        }
    }
}


export default connect(null,mapDispatchToProps)(SearchBar)