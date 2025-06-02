import { useEffect, useState } from "react";
import Board from "./Board";
import { TicTacToe } from "./TicTacToe";
import { miniDecision } from "./Minimax";

export default function App() {
  const [currentSquares, setCurrentSquares] = useState(
    TicTacToe.initialState()
  );
  const [currentPlayer, setCurrentPlayer] = useState(TicTacToe.initialPlayer());
  const [history, setHistory] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  function handlePlay(nextSquares, index) {
    if (isGameOver || currentPlayer !== "X") {
      return;
    } else {
      setCurrentSquares(nextSquares);
      const newHistory = `X (Você) jogou na posição ${index}`;
      setHistory([...history, newHistory]);
    }
  }

  useEffect(() => {
    if (TicTacToe.terminal(currentSquares)) {
      setIsGameOver(true);
      const newHistory = `O jogo acabou. Vencedor: ${
        TicTacToe.calculateWinner(currentSquares) || "Empate"
      }`;
      setHistory((prevHistory) => [...prevHistory, newHistory]);
      return;
    }

    const currentPlayerTurn = TicTacToe.player(currentSquares);
    setCurrentPlayer(currentPlayerTurn);

    if (currentPlayerTurn !== "O") {
      return;
    }

    const aiTimeout = setTimeout(() => {
      const aiMoveIndex = miniDecision(currentSquares);
      const nextSquares = currentSquares.slice();
      nextSquares[aiMoveIndex] = "O";

      setCurrentSquares(nextSquares);
      const newHistory = `O (IA) jogou na posição ${aiMoveIndex}`;
      setHistory((prevHistory) => [...prevHistory, newHistory]);
    }, 2000);

    return () => clearTimeout(aiTimeout);
  }, [currentSquares]);

  const moves = history.map((move, index) => {
    return (
      <li key={index}>
        <div>{move}</div>
      </li>
    );
  });

  return (
    <>
      <h1 className="game-title">Jogo da Velha</h1>
      <div className="game">
        <div className="game-board">
          <Board
            currentPlayer={currentPlayer}
            squares={currentSquares}
            onPlay={handlePlay}
            isGameOver={isGameOver}
          />
        </div>
        <div className="game-info">
          <h3>Histórico</h3>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
