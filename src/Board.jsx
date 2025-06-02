function Board({ squares, currentPlayer, onPlay, isGameOver }) {
  function Square({ value, onSquareClick, player }) {
    return (
      <button
        className={`square ${player ? `player-${player}` : ""}`}
        onClick={onSquareClick}
      >
        {value}
      </button>
    );
  }

  function handleClick(index) {
    const nextSquares = squares.slice();
    nextSquares[index] = "X";
    onPlay(nextSquares, index);
  }

  return (
    <>
      {isGameOver ? (
        <div className="status">O jogo acabou!</div>
      ) : (
        <div className="status">
          O jogador atual é {currentPlayer === "X" ? "X (Você)" : "O (IA)"}
        </div>
      )}
      <div className="board-grid">
        {squares.map((squareValue, index) => (
          <Square
            key={index}
            value={squareValue}
            onSquareClick={() => handleClick(index)}
            player={squareValue}
          />
        ))}
      </div>
    </>
  );
}
export default Board;
