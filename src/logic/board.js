import { WINNER_COMBOS } from "../constants"
 
//metodo para corroborar si hay ganador
  export const checkWinnerFrom = (boardToCheck)=> {
    for(const combo of WINNER_COMBOS){ //por cada combinacion ganadora:
      const [a,b,c]= combo //guardo los valores de a, b, c
      if( //comparo con la combinacion que es const y con el tablero que me mandan en boardToCheck
        boardToCheck[a] && // ejemplo si index en 0 es X u O
        boardToCheck[a]=== boardToCheck[b] && // ej index 1 es igual a
        boardToCheck[a] === boardToCheck[c] // index en 2 es igual tambien a
      ) {
        return boardToCheck[a] // nos devuelve X u O
      }
    }
    return null //si no hay ganador
  }

  export const checkEndGame = (newBoard)=>{
    //si todos los cuadrados (square) son distintos de null quiere decir que termino el juego 
    return newBoard.every((square) => square !=null)
  }