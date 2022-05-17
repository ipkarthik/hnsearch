import React, { Component } from "react";

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            stories: []
        }
    }

    componentDidMount(){
        let that=this;
        let getStories=function(){
            fetch("https://hn.algolia.com/api/v1/search?tags=front_page")
            .then(response=>response.json())
            .then(data=>{
                that.setState({
                    stories: data.hits
                })
            })
            
        }
        getStories();
    }

    render(){
        this.listItems=this.state.stories.map((story,i)=>{
            return (<li className="list-group-item" key={i}>{story.title}</li>);
        });
        return(
            <div className="container">
                <div className="row">
                    <div className="column">
                        <input className="form-control form-control-lg" type="text" placeholder="Enter search query" aria-label="search query"/>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <ul className="list-group">
                            {this.listItems}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}