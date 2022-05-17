import { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import loader from "./loading.gif";


export default function Detail(props){ 
    let {id} = useParams();
    let [story, setStory]=useState({});

    useEffect(()=>{
        const url="http://hn.algolia.com/api/v1/items/"+id;

        const fetchData=async()=>{
            try{
                const response=await fetch(url);
                const json=await response.json();
                console.log(json);
                setStory(json);
            }
            catch(error){
                console.log("error", error);
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
                            <p>{story.points} points</p>
                        </div>
                        <div className="col">
                            <a className="text-decoration-none link-primary" href={story.url}>{story.title}</a>
                        </div>
                    </div>
                    <div className="row">
                        comments:
                        <div className="col">
                            
                        </div>
                    </div>
        
                    </div>
                ):(
                    <img src={loader} className="img-fluid" alt="Responsive image"/>
                )
            }
            <div className="row">
                <div className="col">
                    <a href="/">back</a>
                </div>
            </div>
        </div>
    );
}