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
        this.board.onClickCell (this.eventHandlers?.onClickCell)
        this.menu.onInput (this.eventHandlers?.onInput)
        this.menu.onSubmit (this.eventHandlers?.onSubmit)
        this.menu.onClickMenuBtns (this.eventHandlers?.onClickBtns)
    }

    /**
     * @param {{Function}} handlers 
     */
    bindEvents (handlers) {
        this.eventHandlers = handlers 
    }

    /**
     * @param {string} symbol 
     * @param {number} position 
     */
    updateBoardCell(symbol, position) {
        this.board.updateCell (symbol, position)
    }

    /**
     * @param {string} message 
     * @param {string} state 
     */
    displayMenu(message, state) {
        if (state === "begin")
            this.menu.displayMainMenu (message)
        else if (state === "end")
            this.menu.displayEndMenu (message)
    }

    /**
     * @param {HTMLInputElement} input 
     * @param {string} errorMsg 
     */
    displayErrorInput (input, errorMsg) {
        this.menu.displayError (input, errorMsg)
    }

    /**
     * @param {HTMLInputElement} input 
     */
    removeErrorInput (input) {
        this.menu.removeError (input)
    }

    disableInteractions() {
        this.board.disableBoard ()
    }

    /**
     * @param {Array<number>} cells 
     */
    showWinner(cells) {
        this.board.highlightWinner (cells)
    }

    resetUI() {
        this.board.resetBoard ()
        this.menu.reset ()
    }
}