import React from 'react'
import './Pixel.css'
export default function Pixel(props) {
    function backgroundPicker(state) {
        if(state===0){
            return "white"
        }
        if(state===1){
            return "blue"
        }

        if(state===2){
            return "orange"
        }
        
        if(state===3){
            return "darkblue"
        }

        if(state===4){
            return "brown"
        }

    }
    const stateOfPixel = {
        backgroundColor: backgroundPicker(props.state)
        }
    
    function sinfo(event){
        props.info(props.column, props.row)
        
    }

    return(
        <div className='pixel' 
            style={stateOfPixel}  
            onClick={sinfo}>
            <p className='number'>{props.number}</p>
        </div>
    )
}