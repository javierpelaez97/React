import { Cell } from "./cell";


export function WinnerModal ({resetGame, winner}){

    if (winner === null) return null

    const winnerText = winner === false? 'Empate' : 'Ganó: '

    return(
        <section className="winner">
            <div className="text">
                <h2> {winnerText}</h2>
                <header className="win">
                    {winner && <Cell>{winner}</Cell>}
                </header>
                <footer>
                    <button className="reset-btn" onClick={resetGame}>Empezar de Nuevo</button>
                </footer>
            </div>

        </section>
            
        
    )
}