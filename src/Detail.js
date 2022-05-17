import { useEffect } from "react";
import { useParams } from "react-router-dom";


export default function Detail(props){ 
    let {id} = useParams();

    useEffect(()=>{
        console.log(`${id}`);
    }, []);

    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>HackerNews</h1>
                </div>
            </div>
        </div>
    );
}