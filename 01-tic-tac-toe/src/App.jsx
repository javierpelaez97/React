import { useState } from "react";
import confetti from "canvas-confetti"
const TURNS = {
  X: "X",
  O: "O",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : " "} `;

  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X); // Es un hook que determina un estado al inicio de la aplicacion. Crea un array de dos posiciones

  const [winner, setWinner] = useState(null);

  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;

      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  };

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

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                  {
                    winner === false ? 'Empate' : 'Ganó:'
                  }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>} 
              </header>

              <footer>
                <button onClick={reloadGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default App;
