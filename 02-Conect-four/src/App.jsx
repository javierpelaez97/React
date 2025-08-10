
import { useState } from 'react'
import './App.css'
import { Cell } from './components/cell'
import { turns } from './constants' 
import { checkWinner } from './logic/board'
import confetti from 'canvas-confetti'
import { WinnerModal } from './components/WinnerModal'
import { reloadGameStorage, saveGameToStorage } from './logic/storage'



function App() {

  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(42).fill(null)
  })

  const [turn, setTurn] = useState(()=>{
    const turnFormStorage = window.localStorage.getItem('turn')
    return turnFormStorage ?? turns.Yellow
  })

  const [winner, setWinner] = useState(null)

  const checkEndGame = (newBoard) => {
    return newBoard.every((cell)=> cell !== null)
  }

  const updateBoard = (index) =>{

    if(board[index] || winner) return;

    const column = index % 7
    const newBoard = [...board]

    const newTurn = turn === turns.Yellow? turns.Red : turns.Yellow
    setTurn(newTurn)

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    }) 

    for (let row = 5; row>= 0; row --){
      const cellIndex = row * 7 + column

      if(!board[cellIndex]){
        newBoard[cellIndex] = turn
        const newWinner = checkWinner(newBoard)
        if (newWinner){
          confetti()
          setWinner(newWinner)
        }else if(checkEndGame(newBoard)){
          setWinner(false)
        }

        setBoard(newBoard)
        setTurn(turn === "R" ? "Y" : "R")
        return
      }

    }


  }
  const resetGame = () =>{
    setBoard (Array(42).fill(null))
    setTurn (turns.Yellow)
    setWinner(null)

    reloadGameStorage
  }
  
  

  console.log('hay ganador', winner);
  


  return (
    
    <main className='game-container'>
        <h1>Connect-four</h1>
        <div className='board'>
          {
            board.map((cell,index)=>{
              return(
                <Cell index={index} key={index} updateBoard={updateBoard}>
                  {cell}
                </Cell>
              )
            })
          }
        </div>
        { turn === turns.Yellow ? <Cell >{turns.Yellow}</Cell> :<Cell >{turns.Red}</Cell>

        }
        <button className='reset-btn' onClick={resetGame}>Resetear Juego</button>

        <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
    </main>
  )
}

export default App
