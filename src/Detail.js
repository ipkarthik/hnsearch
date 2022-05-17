import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import loader from "./loading.gif";


export default function Detail(props){ 
    let {id} = useParams();
    let [story, setStory]=useState({});
    let [comments, setComments]=useState([]);

    useEffect(()=>{
        const url="http://hn.algolia.com/api/v1/items/"+id;

        const fetchData=async()=>{
            try{
                const response=await fetch(url,{mode: "cors"});
                const json=await response.json();
                setStory(json);
                setComments(json.children.map((comment, j)=>{
                    return (<li className="list-group-item" key={j}>{comment.author + ": " + comment.text}</li>); 
                }));
            }
            catch(error){
            }
        };

        fetchData();
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>HackerNews</h1>
                </div>
            </div>
            {
                story.points?(
                    <div>
                        <div className="row">
                            <div className="col">
                                <p className="text-center" id="story-points"><b>{story.points} points</b></p>
                            </div>
                            <div className="col">
                                <a id="story-title" className="text-decoration-none link-primary" href={story.url}><b>{story.title}</b></a>
                            </div>
                        </div>
                        <div className="row">
                            comments:
                            <div className="col">
                                <ol className="list-group list-group-flush" id="comments-list">
                                    {comments}
                                </ol>
                            </div>
                        </div>
                    </div>
                ):(
                    <img src={loader} className="img-fluid" alt="Responsive image" id="loader-image"/>
                )
            }
            <div className="row">
                <div className="col">
                    <a href="/" id="back-link">back</a>
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