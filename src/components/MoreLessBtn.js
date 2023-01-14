import React from "react";

function MoreLessBtn ({ text, action }){
    return(
        <button onClick={action}> {text} </button>   
    )
}

export default MoreLessBtn;