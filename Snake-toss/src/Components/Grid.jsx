import React from 'react'
import Pixel from './Pixel'
import './Grid.css'

export default function Grid(props) {
  
  const grid = ((props.gridInfo).map(position => 
      <Pixel 
      column={position.column} 
      row={position.row} 
      state={position.state} 
      info={props.info}
      />
  ))


  return (
   <div className='grid'>
    {grid}
   </div>
  )
}
