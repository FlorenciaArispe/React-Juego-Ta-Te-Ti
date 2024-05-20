import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import  {TURNS} from "./constants.js"
import { checkWinnerFrom , checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"

function App() {
  //estado para ver el tablero segun el localStorage
  const [board, setBoard]= useState(() =>{

    const boardFromStorage= window.localStorage.getItem('board')

    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  }) 

  //estado para saber de quien es el turno
  const [turn, setTurn]=useState(()=>{
    const turnFromStorage= window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X 
  } )

  //estado para saber si alguien gano
  //null es que no hay ganador, false es que hay empate
  const [winner, setWinner] =useState(null)

  const resetGame= () => {
    setBoard(Array(9).fill(null),
    setTurn(TURNS.X),
    setWinner(null))

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')

  }


  //funcion para cambiar tablero 
  const updateBoard= (index) => {
    //que no reescriba cuando ya coloque el turno o si tenemos un ganador
    if(board[index] || winner)return 

    //actualizar tablero con X u O
    const newBoard= [... board] //REST OPERATOR: para que copie el array board y no modifique el original
    newBoard[index]=turn 
    setBoard(newBoard)

    //cambiar turno: si el turno es de la X el siguiente va a ser el O, y asi al reves
    const newTurn= turn=== TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //guardar la partida cuando se resetea la pagina 
    //guardo el estado actual del tablero y array pasado a string
    window.localStorage.setItem('board', JSON.stringify(newBoard)) 
    window.localStorage.setItem('turn', newTurn)

    //revisar si hay ganador
    const newWinner= checkWinnerFrom(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)// empate
    }
  }

  return (
    <main className='board'>
      <h1>TA-TE-TI</h1>
      <button onClick={resetGame}>Reiniciar juego</button>
      <section className="game">
        {
          board.map((_, index)=> {
            return(
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
                {board[index]}
                </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

     <WinnerModal resetGame={resetGame} winner={winner} />
     
    </main>
  )
}

export default App;
