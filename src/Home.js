import React, { Component } from "react";

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            stories: [],
            page: 1
        }
    }

    componentDidMount(){
        let that=this;
        let getStories=function(){
            fetch("https://hn.algolia.com/api/v1/search?page="+that.state.page)
            .then(response=>response.json())
            .then(data=>{
                let filteredStories=data.hits.map(hit=>{
                    if(hit.title){
                        return hit;
                    }
                });
                console.log(filteredStories)
                that.setState({
                    stories: filteredStories
                })
            })
        }
        getStories();

        that.executeSearch=function(searchText){
            if(searchText){
                fetch("https://hn.algolia.com/api/v1/search?query="+searchText)
                .then(response=>response.json())
                .then(data=>{
                    let filteredStories=data.hits.map(hit=>{
                        if(hit.title){
                            return hit;
                        }
                    })
                    console.log(filteredStories);
                    that.setState({
                        stories: filteredStories
                    })
                })
            }
            else{
                getStories()
            }
        }
    }

    render(){
        this.listItems=this.state.stories.map((story,i)=>{
            if(story){
                return (<li className="list-group-item" key={i}>
                            <a href={story.url || "#"} class="link-secondary text-decoration-none">{story.title}</a>
                        </li>);
            }
        });
        return(
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>HackerNews</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input id="search-query" className="form-control form-control-lg" type="text" placeholder="Enter search query" aria-label="search query" onChange={e=>this.executeSearch(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <ol className="list-group list-group-numbered" id="stories-list">
                            {this.listItems}
                        </ol>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <a href="#" className="link-primary" id="next-link">next</a>
                        <a href="#" className="link-primary" id="previous-link">previous</a>
                    </div>
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