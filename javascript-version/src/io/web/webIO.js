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
        this.board.onClickCell (this.eventHandlers.onClickCell)
        this.menu.onInput (this.eventHandlers.onInput)
        this.menu.onSubmit (this.eventHandlers.onSubmit)
        this.menu.onClickMenuBtns (this.eventHandlers.onClickBtns)
        this.board.onHoverCell (this.eventHandlers.onMouseEnter, this.eventHandlers.onMouseLeave)
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
    displayMenu (state, message = "") {
        if (state === "begin")
            this.menu.displayMainMenu (message)
        else if (state === "end")
            this.menu.displayEndMenu ()
    }

    /**
     * @param {string} playerName 
     * @param {string} playerSymbol 
     * @param {string} message 
     */
    displayTurn (playerName, message) {
        this.menu.displayMiddleParty (playerName, message)
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

    reableInteractions () {
        this.board.reEnableBoard ()
    }

    /**
     * @param {Array<number>} cells 
     */
    showWinner(cells) {
        this.board.highlightWinner (cells)
    }

    /**
     * @param {string} state 
     */
    resetUI(state) {
        this.board.resetBoard ()
        if (state === "restart")
            this.menu.resetRestartGame ()
        else {
            this.menu.resetQuitGame ()
        }
    }

    /**
     * @param {HTMLElement} cell 
     * @param {String} old 
     * @param {String} jdid 
     */
    changeBG (cell, old, jdid) {
        this.board.changeBG (cell, old, jdid)
    }

    /**
     * @param {HTMLElement} cell
     * @param {String} symbol 
     * @param {Boolean} status 
     */
    changeHover (cell, symbol, status) {
        this.board.changeHover (cell, symbol, status)
    }
}