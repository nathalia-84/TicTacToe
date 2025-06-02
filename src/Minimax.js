import { TicTacToe } from "./TicTacToe";

export function minimaxAlgorithm(squares, isMaximizing) {
  if (TicTacToe.terminal(squares)) {
    return TicTacToe.utility(squares);
  }
  if (isMaximizing) {
    let value = -Infinity;
    const availableMoves = TicTacToe.actions(squares);
    for (const move of availableMoves) {
      const nextSquares = TicTacToe.result(move, true, squares);
      value = Math.max(value, minimaxAlgorithm(nextSquares, false));
    }
    return value;
  } else {
    let value = Infinity;
    const availableMoves = TicTacToe.actions(squares);
    for (const move of availableMoves) {
      const nextSquares = TicTacToe.result(move, false, squares);
      value = Math.min(value, minimaxAlgorithm(nextSquares, true));
    }
    return value;
  }
}

export function miniDecision(squares) {
  let bestScore = Infinity;
  let bestMove = null;
  const availableMoves = TicTacToe.actions(squares);

  if (availableMoves.length === 0) {
    return null;
  }

  for (const move of availableMoves) {
    const nextSquares = TicTacToe.result(move, false, squares);
    const score = minimaxAlgorithm(nextSquares, true);

    if (score < bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }

  if (bestMove === null && availableMoves.length > 0) {
    bestMove = availableMoves[0];
  }

  return bestMove;
}
