import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./componets/Square"
import { TURNS} from "./constans"
import { checkWinnerFrom, checkEndGame } from "./logic/board"
import { WinnerModal } from "./componets/WinnerModal"
import { saveGameToStorage, resetGameStorage } from "./logic/storage"



function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  const [winner, setWinner] = useState(null) // null es no hay ganador, false es empate

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    winner === 'O' ? setTurn(TURNS.O) : setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
      //Actualizar tablero
      const newBoard = [...board] // copy the board    Spread operator and Rest operator
      newBoard[index] = turn
      setBoard(newBoard)

      //Cambiar de turno
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)

      //Guardar partida
      saveGameToStorage({board:newBoard,turn:newTurn})

      //Revisar si hay ganador
      const newWinner = checkWinnerFrom(newBoard)
      if (newWinner){
        confetti()
        setWinner(newWinner)
      } else if (checkEndGame(newBoard)){
        setWinner(false)
      }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className="game">
        {
          board.map((_,index)=>{
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
