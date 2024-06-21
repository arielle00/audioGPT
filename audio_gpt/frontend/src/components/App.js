import React, {Component} from "react";
import {render} from "react-dom"
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoom from "./CreateRoom";


export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){
        
        return (<div>
            <HomePage></HomePage>
            </div>
        );
    }
}

const appDiv = document.getElementById("app");
render(<App name="arielle"/>, appDiv);
