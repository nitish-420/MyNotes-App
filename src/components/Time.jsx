import React from "react";
function Time(){
    const now=new Date().toLocaleString();
    const [time,setTime]=React.useState(now);

    function set(){
        setTime(new Date().toLocaleString())
    }
    setInterval(set,1000);
    return (
        <p className="runningTime">{time}</p>
    )
}

export default Time