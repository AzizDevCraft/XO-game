import BoardView from "./BoardView.js";
import MenuView from "./MenuView.js";

export default class WebIO {

    constructor () {
        this.board = new BoardView ()
        this.menu = new MenuView ()
        this.eventHandlers = {} 
    }

    init () {
        this.menu.renderTopBar ()
        this.board.renderBoard ()
        this.board.onClick?. (this.eventHandlers.onCellsClick)
        this.menu.onInput?. (this.eventHandlers.onValid)
    }

    /**
     * @param {{Function}} handlers 
     */
    bindEvents (handlers) {
        this.eventHandlers = handlers 
    }

    updateBoardCell(symbol, position) {
        this.board.updateCell (symbol, position)
    }

    displayMenu(message, state) {
        if (state === "begin")
            this.menu.displayMainMenu (message)
        else if (state === "end")
            this.menu.displayEndMenu (message)
    }

    showWinner(cells) {
        this.board.highlightWinner (cells)
    }

    resetUI() {
        this.board.resetBoard ()
        this.menu.reset ()
    }
}