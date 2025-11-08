export default class BoardView {

    #handlers;

    constructor (root = document.body) {
        this.root = root
        this.#handlers = new Map ()
    }

    renderBoard () {
        const tplBoard = document.querySelector ("#tpl-board")
        const boardFragment = tplBoard.content.cloneNode (true)
        this.root.append (boardFragment)
        
        this.cells = this.root.querySelector ("#board").children
    }

    /**
     * @param {string} symbol 
     * @param {number} position 
     */
    updateCell (symbol, position) {
        const playedCell = [].find.call (this.cells, (cell) => Number(cell.dataset.position) === position -1)
        if (!playedCell.dataset.play) {
            const icon = document.createElement("i")
            icon.setAttribute ("class", `text-7xl fa-solid fa-${symbol.toLowerCase ()}`)
            playedCell.dataset.play = symbol
            playedCell.append (icon)
        }
        else 
            return false
    }

    resetBoard () {
        for (let cell of this.cells) {
            cell.dataset.play = ""
            cell.firstElementChild?.remove ()
        }
    }

    /**
     * @param {Array<number>} cells 
     */
    highlightWinner (cells) {
        [].forEach.call (this.cells, (cell) => {
            if (cells.includes(Number(cell.dataset.position))){
                cell.firstElementChild?.classList.add ("text-red-500")
            }
        })
    }

    /**
     * @param {Function} handler 
     */
    onClickCell (handler) {
        [].forEach.call (this.cells, (cell) => {
            const clickHandler = (event) => handler (event)
            cell.addEventListener ("click", clickHandler)
            this.#handlers.set (cell, clickHandler)
        })
    }

    disableBoard () {
        [].forEach.call (this.cells, (cell) => {
            cell.removeEventListener ("click", this.#handlers.get (cell))
        })
    }

    reableBoard () {
        [].forEach.call (this.cells, (cell) => {
            cell.addEventListener ("click", this.#handlers.get (cell))
        })
    }
    
}