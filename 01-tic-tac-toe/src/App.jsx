import { useState } from "react";
import confetti from "canvas-confetti"
import {Square} from "./components/Square.jsx";
import {TURNS} from "./constants"
import { checkWinner } from "./logic/board.js";
import {WinnerModal} from "./components/WinnerModal.jsx";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X); // Es un hook que determina un estado al inicio de la aplicacion. Crea un array de dos posiciones

  const [winner, setWinner] = useState(null);

  

  const checkEndGame=(newBoard) => {

    //Si todas las posiciones del array square son diferentes a null y no hya ganador
    return newBoard.every((square)=> square !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return;       // Inidicamos que si el board tiene algo no lo pintamos ni hacemos nada de nuevo
    /* Creamos un nuevo tablero recogemos el inidce de la posicion y le indicamos el turno que estamos */
    const newBoard = [...board];              // Para crear una copia de un array de forma superficial
    newBoard[index] = turn;                   //Debemos tratar los estados como inmutables
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  };
  /* Para poder reiniciar un componente es resetear sus valores a los de origen */
  const reloadGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={reloadGame}>Resetear Juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner = {winner} reloadGame={reloadGame} ></WinnerModal>
    </main>
  );
}

export default App;
