export const Square= ({children, isSelected, updateBoard, index}) =>{//cuadrado del tablero (cildren: si es x u o, isSelected para saber de quien es el turno, updateboard para actualizar el tablero, index para saber donde estamos parados)
    const className=`square ${isSelected ? 'is-selected': ''}`
    
    const handleClick= () => {
      updateBoard(index);//Le pasamos el index para saber en cual hizo click
    }
  
    return( //componente que queremos renderizar
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }