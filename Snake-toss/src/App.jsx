import React from 'react'
import './App.css'
import Pixel from './Components/Pixel'


function App() {
  let numb = 0
  let numo = 0
  let endloop = 0
  const [gridInfo, setGridInfo] = React.useState([])
  const [switchChoice, setSwitchChoice] = React.useState(true)
  const [headSquares, setHeadSquares] = React.useState([-1,-1,-1,-1])
  const [chosePositionState, setChosePositionState] = React.useState(true)
  const [gameOver, setGameOver] = React.useState(false)
  const [winner, setWinner] = React.useState(0)
  const [restart, setRestart] = React.useState(true)
  const [loop, setLoop] = React.useState(false)

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

React.useEffect(function(){ 
    const newGridInfo = []
    for(let i=0; i<10; i++){
      for(let j=0; j<10; j++){
          const newPixel = {
            state: 0,
            column: j,
            row: i,
            number: null
          } 
          newGridInfo.push(newPixel) 
        }   
      }
      setGridInfo(newGridInfo)
  }, [restart])

const grid = gridInfo.map(position => 
  <Pixel 
    key={position.column+10*position.row}
    column={position.column} 
    row={position.row} 
    state={position.state} 
    info={changePixel}
    number={position.number}
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
      return false
    } 
  }
  setChosePositionState(false)
  return true
}

function move(column,row,state,move,list,numbe){
  setGridInfo(prevInfo => {
    const position=column+10*row
    let newposition = position-move
    list[position]=true
    list[newposition]=true
    const head=state+2
    const info=[]
    for(let i = 0; i <prevInfo.length; i++){
      const currentInfo = prevInfo[i]
      
      if(i === newposition){
        const updatedInfo = {
          ...currentInfo, state:head
        }
        info.push(updatedInfo)
      }
      else if(i === position){
        
        const updatedInfo = {
          ...currentInfo, state:state, number:numbe
        }
        info.push(updatedInfo)
      } else{
        const updatedInfo = currentInfo

        info.push(updatedInfo)  
      }
    }
    return info
  })
}

function iterate(state){
  if (state===1){
    numb=numb+1
    return numb
  }else{
    numo=numo+1
    return numo
  }
}

function goUp(column, row, state,list){
  const n = iterate(state)
  move(column,row,state,10,list,n)
  return [column, row-1]
}

function goDown(column, row, state,list){
  const n = iterate(state)
  move(column,row,state,-10,list,n)
  return [column,row+1]
}

function goLeft(column, row, state,list){
  const n = iterate(state)
  move(column,row,state,1,list,n)
  return [column-1,row]
}

function goRight(column, row, state,list){
  const n = iterate(state)
  move(column,row,state,-1,list,n)
  return [column+1,row]
}

function boundaryCheck(column, row, checkList){
  if(row===0){
    checkList[0]=false
  }
  if(row===9){
    checkList[1]=false
  }
  if(column===0){
    checkList[2]=false
  }
  if(column===9){
    checkList[3]=false
  }
}

function surroundingCheck(column, row, checkList,emptyCheckList){
  const position=column+10*row
  if(position-10>-1){
    if(emptyCheckList[position-10]){
      checkList[0]=false
    }
  }
  if(position+10<100){
    if(emptyCheckList[position+10]){
      checkList[1]=false
    }
  }
  if(position-1>-1){
    if(emptyCheckList[position-1]){  
      checkList[2]=false
  }
  }
  if(position+1<100){
    if(emptyCheckList[position+1]){
      checkList[3]=false
  }
  }
}

function winningCondition(checkList){
  for(let i = 0; i <checkList.length; i++){
    if(checkList[i]===true){return false}
  }
  return true
}

async function startGame(){
  if(!startGameCheck()){return}

  let notEmptySquares=[]
  for(let i=0; i<100; i++){
    notEmptySquares[i]=false
  }

  setLoop(true)
  endloop=1

  let blueHead=[headSquares[0],headSquares[1]]
  let orangeHead=[headSquares[2],headSquares[3]]
  notEmptySquares[headSquares[0]+10*headSquares[1]]=true
  notEmptySquares[headSquares[2]+10*headSquares[3]]=true

  while(true){
    console.log(loop)
    console.log(endloop)
    // if(loop){
    //   break
    // }
    if(endloop===0){
      break
    }
    let blueChecklist = [true,true,true,true]
    let orangeChecklist = [true,true,true,true]
    boundaryCheck(blueHead[0],blueHead[1],blueChecklist)
    boundaryCheck(orangeHead[0],orangeHead[1],orangeChecklist)
    surroundingCheck(blueHead[0],blueHead[1],blueChecklist,notEmptySquares)
    surroundingCheck(orangeHead[0],orangeHead[1],orangeChecklist,notEmptySquares)
    if(winningCondition(blueChecklist)){
      console.log("orange won")
      setWinner(4)
      setGameOver(true)
      break
    }
    if(winningCondition(orangeChecklist)){
      console.log("blue won")
      setWinner(3)
      setGameOver(true)
      break
    }
    const randPlayer = Boolean(Math.round(Math.random()));
    let randMove = randomNumberInRange(0,3)
    if(randPlayer){
      while(true){
        randMove = randomNumberInRange(0,3)
        if(blueChecklist[randMove]){break}
      }
      if(randMove===0){
        blueHead = goUp(blueHead[0],blueHead[1],1,notEmptySquares)
      }
      if(randMove===1){
        blueHead = goDown(blueHead[0],blueHead[1],1,notEmptySquares)
      }
      if(randMove===2){
        blueHead = goLeft(blueHead[0],blueHead[1],1,notEmptySquares)
      }
      if(randMove===3){
        blueHead = goRight(blueHead[0],blueHead[1],1,notEmptySquares)
      }
      }else{
      while(true){
        randMove = randomNumberInRange(0,3)
        if(orangeChecklist[randMove]){break}
      }
      if(randMove===0){
        orangeHead = goUp(orangeHead[0],orangeHead[1],2,notEmptySquares)
      }
      if(randMove===1){
        orangeHead = goDown(orangeHead[0],orangeHead[1],2,notEmptySquares)
      }
      if(randMove===2){
        orangeHead = goLeft(orangeHead[0],orangeHead[1],2,notEmptySquares)
      }
      if(randMove===3){
        orangeHead = goRight(orangeHead[0],orangeHead[1],2,notEmptySquares)
      }
    }
    await new Promise(r => setTimeout(r, 500));
  }
  
}

function startOver(){
  setRestart(prev=>!prev)
  numb=0
  numo=0
  endloop=0
  setSwitchChoice(true)
  setHeadSquares([-1,-1,-1,-1])
  setChosePositionState(true)
  setGameOver(false)
  setWinner(0)
  setLoop(false)
}

  return (
    <div className='main'>
      <div className='grid'>
        {grid}
      </div>
        {chosePositionState === true ?
      
      <>
      <div className='dashboard'>
        <div className='chose'>
          <p>Chose your starting position:</p>

          <Pixel
            key={"special"}
            column={1000}
            row={1000}
            state={switchChoice ? 3 : 4}
          />
        </div>

          <button className='start-button' onClick={startGame}>start</button>

        </div>
      </>
      
        :

        <div className='dashboard'>
          <div className='dashboadr-info'>
            <p>winner: {gameOver}</p>
            <Pixel
              key={"special2"}
              column={1001}
              row={1001}
              state={winner}
            />
          </div>
            <button className='start-button' onClick={startOver}>Reset</button>
          
        </div>

        }
    
    </div>
  )
}

export default App
