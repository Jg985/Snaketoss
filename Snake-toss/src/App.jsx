import React from 'react'
import './App.css'
import Pixel from './Components/Pixel'


function App() {
  const [gridInfo, setGridInfo] = React.useState([])
  const [switchChoice, setSwitchChoice] = React.useState(true)


  React.useEffect(function(){ 
    const newGridInfo = []
    for(let i=0; i<10; i++){
      for(let j=0; j<10; j++){
          const newPixel = {
            state: 0,
            column: j,
            row: i
          } 
          newGridInfo.push(newPixel) 
        }   
      }
      setGridInfo(newGridInfo)
  }, [])

function changePixel (column, row){
  const index = column+10*row
  
  setGridInfo(prevInfo => {
    const newInfo = []
    let newstate = 0
    let oldstate = 0
    if(switchChoice){
      newstate=3
      oldstate = 4
    }else{
      newstate=4
      oldstate = 3
    }
    for(let i = 0; i <prevInfo.length; i++){
      const currentInfo = prevInfo[i]
      if(i === index){
        const updatedInfo = {
          ...currentInfo, state:newstate
        }
      } else{
          if(currentInfo.state !== oldstate){
          const updatedInfo = {
            ...currentInfo, state:0
          }
        }else{
          const updatedInfo = {
            ...currentInfo, state:oldstate
          }
        }
      }
    }
    return newInfo
  })
  setSwitchChoice(prevState => !prevState)
}

const grid = gridInfo.map(position => 
  <Pixel 
    key={position.column+10*position.row}
    column={position.column} 
    row={position.row} 
    state={position.state} 
    info={changePixel}
  />
)

  return (
    <div className='grid'>
      {grid}
      <p>now chosing:</p>
      <Pixel
      key={"special"}
      column={1000}
      row={1000}
      state={switchChoice ? 3 : 4}
      />
    </div>
  )
}

export default App
