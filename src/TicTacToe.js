export class TicTacToe {
  static initialState() {
    return Array(9).fill(null);
  }
  static initialPlayer() {
    return "X";
  }
  static calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  static actions(squares) {
    return squares.reduce((acc, cell, index) => {
      if (cell === null) {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  static result(index, xIsNext, squares) {
    const resultState = squares.slice();
    resultState[index] = xIsNext ? "X" : "O";
    return resultState;
  }

  static terminal(squares) {
    const isWinner = this.calculateWinner(squares);
    if (isWinner) return true;
    if (squares.every((cell) => cell !== null)) return true;
    return false;
  }

  static utility(squares) {
    const winnerValue = this.calculateWinner(squares);
    if (winnerValue === "X") return 1;
    if (winnerValue === "O") return -1;
    return 0;
  }

  static player(squares) {
    if (squares.every((cell) => cell === null)) {
      return "X";
    } else {
      const xCount = squares.filter((cell) => cell === "X").length;
      const oCount = squares.filter((cell) => cell === "O").length;
      return xCount <= oCount ? "X" : "O";
    }
  }
}
