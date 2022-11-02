import React from 'react'
import './App.css'
import Pixel from './Components/Pixel'


function App() {
  const [gridInfo, setGridInfo] = React.useState([])
  const [switchChoice, setSwitchChoice] = React.useState(true)
  const [headSquares, setHeadSquares] = React.useState([-1,-1,-1,-1])
  const [chosePositionState, setChosePositionState] = React.useState(true)
  const [color, setColor] = React.useState(true)

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

const grid = gridInfo.map(position => 
  <Pixel 
    key={position.column+10*position.row}
    column={position.column} 
    row={position.row} 
    state={position.state} 
    info={changePixel}
  />
)

function changePixel (column, row){

  const index = column+10*row

  if(!chosePositionState){return}

  if(headSquares[0]===column && headSquares[1]===row){return}
  if(headSquares[2]===column && headSquares[3]===row){return}

  setHeadSquares(prevTable => {
    const newtable=prevTable
    if(switchChoice){
      newtable[0]=column
      newtable[1]=row
    }else{
      newtable[2]=column
      newtable[3]=row
    }
    return newtable
  })
  
  setGridInfo(prevInfo => {

    const newInfo = []
    let newstate = 0
    let oldstate = 0
    if(switchChoice){
      newstate=3
      oldstate=4
    }else{
      newstate=4
      oldstate=3
    }

    for(let i = 0; i <prevInfo.length; i++){
      const currentInfo = prevInfo[i]
      
      if(i === index){
        const updatedInfo = {
          ...currentInfo, state:newstate
        }
        newInfo.push(updatedInfo)
      } else{
        if(currentInfo.state!==oldstate){
        const updatedInfo = {
          ...currentInfo, state:0
        }
        newInfo.push(updatedInfo)
      }else{
        const updatedInfo = {
          ...currentInfo, state:oldstate
        }
        newInfo.push(updatedInfo)
      }
      }
    }
    return newInfo
  })
  setSwitchChoice(prevState => !prevState)
}

function startGameCheck(){
  for(let i=0; i<headSquares.length; i++){
    if(headSquares[i]===-1){
      setChosePositionState(true)
      return
    } 
  }
  setChosePositionState(false)
}

function move(column,row,state,move){
  setGridInfo(prevInfo => {
    const position=column+10*row
    const head=state+2
    const info=[]
    for(let i = 0; i <prevInfo.length; i++){
      const currentInfo = prevInfo[i]
      
      if(i === position-move){
        const updatedInfo = {
          ...currentInfo, state:head
        }
        info.push(updatedInfo)
      }
      else if(i === position){
        
        const updatedInfo = {
          ...currentInfo, state:state
        }
        info.push(updatedInfo)
      } else{
        const updatedInfo = currentInfo

        info.push(updatedInfo)  
      }
    }
    console.log(info)
    return info
  })
}

function goUp(column, row, state, color){
  move(column,row,state,10)
  return [column, row-1]
}

function goDown(column, row, state){
  move(column,row,state,-10)
  return [column,row+1]
}

function goLeft(column, row, state){
  move(column,row,state,1)
  return [column-1,row]
}

function goRight(column, row, state){
  move(column,row,state,-1)
  return [column+1,row]
}

function startGame(){
  let blueHead=[headSquares[0],headSquares[1]]
  let orangeHead=[headSquares[2],headSquares[3]]
  startGameCheck()
  blueHead = goUp(blueHead[0],blueHead[1],1)
  blueHead = goUp(blueHead[0],blueHead[1],1)
  blueHead = goLeft(blueHead[0],blueHead[1],1)
  blueHead = goLeft(blueHead[0],blueHead[1],1)
  blueHead = goDown(blueHead[0],blueHead[1],1)
  blueHead = goDown(blueHead[0],blueHead[1],1)
  blueHead = goDown(blueHead[0],blueHead[1],1)
  blueHead = goRight(blueHead[0],blueHead[1],1)
  console.log(gridInfo)
}

  return (
    <div className='grid'>

      {grid}

      {chosePositionState === true ?

      <>

      <p>now chosing:</p>

      <Pixel
        key={"special"}
        column={1000}
        row={1000}
        state={switchChoice ? 3 : 4}
      />

        <button onClick={startGame}>start</button>

      </>

        :

        <>
          <p>game started</p>
        </>

        }
      
    </div>
  )
}

export default App
