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

        that.executeSearch=function(searchText){
            console.log(searchText);
            let filteredStories=[];
            for(let i=0;i<that.state.stories.length;i++){
                if(that.state.stories[i]&&that.state.stories[i].title.indexOf(searchText)!==-1){
                    filteredStories.push(that.state.stories[i]);
                }
            }
            that.setState({
                stories: filteredStories
            })
        }
    }

    render(){
        this.listItems=this.state.stories.map((story,i)=>{
            return (<li className="list-group-item" key={i}>{story.title}</li>);
        });
        return(
            <div className="container">
                <div className="row">
                    <div className="column">
                        <h1>HackerNews</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <input id="search-query" className="form-control form-control-lg" type="text" placeholder="Enter search query" aria-label="search query" onChange={e=>this.executeSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <ul className="list-group" id="stories-list">
                            {this.listItems}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}