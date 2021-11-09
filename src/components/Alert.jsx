import React from 'react'

function Alert(props){
    return (
        <div style={{height:"40px"}}>
            {props.alert &&
            <div className={`alert alert-${props.alert.type} `} role="alert">
                {props.alert.message}
            </div>}
            
        </div>
    )
}

export default Alert