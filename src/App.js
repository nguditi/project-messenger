import React from 'react'
import ChatRoom from './Components/ChatRoom'
import LoginPage from "./Components/LoginPage";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={LoginPage}/>
            <Route exact path="/messenger" component={ChatRoom}/>
        </Switch>
    </Router>
)
export default App



