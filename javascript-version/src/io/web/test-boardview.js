import BoardView from "./BoardView.js"
import Board from "../../core/Board.js"


const board = new Board ()
const boardWeb = new BoardView (board.board)
boardWeb.renderBoard ()
boardWeb.updateCell ("X", 2)
boardWeb.updateCell ("O", 5)
boardWeb.updateCell ("X", 5)
boardWeb.updateCell ("X", 8)
boardWeb.updateCell ("O", 4)
boardWeb.updateCell ("X", 0)
boardWeb.updateCell ("O", 3)
boardWeb.highlightWinner ([3, 4, 5])