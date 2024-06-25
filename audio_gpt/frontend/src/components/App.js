import React, {Component} from "react";
// import {render} from "react-dom";
import HomePage from "./HomePage";
import { createRoot } from 'react-dom/client';


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
const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);
