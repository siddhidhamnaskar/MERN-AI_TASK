import { useEffect } from "react"


export const OnlineStore=({prompt,response})=>{
    useEffect(()=>{
        console.log("Prompt:", prompt);
        console.log("Response:", response);
    },[prompt,response]);
    return (
        <div>
            <h1>Online Store</h1>
            <p>Prompt: {prompt}</p>
            <p>Response: <div dangerouslySetInnerHTML={{ __html: response }}/></p>
        </div>
    )
}   
