import React, { Component } from "react";
import axios from "axios";

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }



    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="column">
                        <input className="form-control form-control-lg" type="text" placeholder="Enter search query" aria-label="search query"/>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        
                    </div>
                </div>
            </div>
        );
    }
}