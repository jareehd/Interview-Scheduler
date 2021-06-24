import React from 'react'

const Interview = ({item}) => {
    
    const date = new Date(parseInt(item.duration.start)).toDateString()
    const start = new Date(parseInt(item.duration.start)).toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true, minute: 'numeric' })
    const end = new Date(parseInt(item.duration.end)).toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true, minute: 'numeric' })
    return (
        <div>
            <span style={{fontFamily: "arial"}}> Participants : </span>
                {item.emails.map( (email,index) =>(<span style={{fontFamily: "verdana"}} key={index} >{email} &nbsp;&nbsp; </span> ))}
            <br/>
            <span style={{fontFamily: "arial"}}> Day : {date}<br/> </span>
            Start time :
            <span style={{fontFamily: "arial"}}> {start}  </span> - 
            End time : 
            <span style={{fontFamily: "arial"}}> {end}<br/> </span>
            { item.resume  && 
            <div>
                <br/>
                <span style={{fontFamily: "arial"}}>Resume :  </span><br/>
                <embed src={item.resume} width="900px" height="300px" />
            </div>}

            <hr/>
        </div>
    )
}

export default Interview;