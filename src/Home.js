import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            stories: [],
            page: 1,
        }
    }

    componentDidMount(){
        let that=this;
        let getStories=function(){
            fetch("https://hn.algolia.com/api/v1/search?page="+that.state.page, {mode:'cors'})
            .then(response=>response.json())
            .then(data=>{
                let filteredStories=data.hits.map(hit=>{
                    if(hit.title){
                        return hit;
                    }
                });
                that.setState({
                    stories: filteredStories
                })
            })
        }
        getStories();

        that.executeSearch=function(searchText){
            if(searchText){
                fetch("https://hn.algolia.com/api/v1/search?query="+searchText, {mode:'cors'})
                .then(response=>response.json())
                .then(data=>{
                    let filteredStories=data.hits.map(hit=>{
                        if(hit.title){
                            return hit;
                        }
                    })
                    that.setState({
                        stories: filteredStories,
                    })
                })
            }
            else{
                getStories()
            }
        }

        that.increasePage=function(e){
            that.setState({
                page: that.state.page+1,
            });
            getStories();
        }

        that.decreasePage=function(e){
            that.setState({
                page: that.state.page-1,
            });
            getStories();
        }
    }

    render(){
        this.listItems=this.state.stories.map((story, i)=>{
            if(story){
                return (<li className="list-group-item" key={i}>
                            <Link to={"detail/"+story.objectID} className="link-secondary text-decoration-none">{story.title}</Link>
                        </li>);
            }
        });
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1 id="app-title">HackerNews</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input id="search-query" className="form-control form-control-lg" type="text" placeholder="Search" aria-label="search query" onChange={e=>this.executeSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ol className="list-group list-group-flush" id="stories-list">
                            {this.listItems}
                        </ol>
                    </div>
                </div>
                <div className="row">
                    {this.state.page}
                    {this.state.page==1 ? 
                    (<div className="col">
                        <a href="#" className="link-primary" id="next-link" onClick={this.increasePage}>next</a>
                    </div>):
                    (<div className="col">
                        <a href="#" className="link-primary" id="previous-link" onClick={this.decreasePage}>previous</a>
                        <a href="#" className="link-primary" id="next-link" onClick={this.increasePage}>next</a>
                    </div>)}
                </div>
                <div className="row">
                    <div className="col">
                        <h6 id="footer" className="text-center">&copy; 2022</h6>
                    </div>
                </div>
            </div>
        );
    }
}