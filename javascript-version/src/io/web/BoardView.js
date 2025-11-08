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
     * @param {HTMLElement} cell 
     * @param {string} event 
     * @param {Function} handler
     */
    saveHandlers (cell, event, handler) {
        if (this.#handlers.has (cell) && !this.#handlers.get(cell).has(event))
            this.#handlers.get (cell).set (event, handler)
        else if (!this.#handlers.has (cell))
            this.#handlers.set (cell, new Map ([[event, handler]]))
    }

    /**
     * @param {Function} handler 
     */
    onClickCell (handler) {
        [].forEach.call (this.cells, (cell) => {
            const clickHandler = (event) => handler (event)
            cell.addEventListener ("click", clickHandler)
            this.saveHandlers (cell, "click", clickHandler)
        })
    }

    /**
     * @param {Function} mouseEnterHandler 
     * @param {Function} mouseLeaveHandler 
     */
    onHoverCell (mouseEnterHandler, mouseLeaveHandler) {
        [].forEach.call (this.cells, (cell) => {
            const enterHandler = (event) => mouseEnterHandler (event)
            const leaveHandler = (event) => mouseLeaveHandler (event)
            cell.addEventListener ("mouseenter", enterHandler)
            cell.addEventListener ("mouseleave", leaveHandler)
            this.saveHandlers (cell, "mouseenter", enterHandler)
            this.saveHandlers (cell, "mouseleave", leaveHandler)
        })
    }

    disableBoard () {
        [].forEach.call (this.cells, (cell) => {
            for (let [eventName, handler] of this.#handlers.get (cell).entries()){
                cell.removeEventListener (eventName, handler)
            }
        })
    }

    reEnableBoard () {
        Array.prototype.forEach.call (this.cells, (cell) => {
            for (let [eventName, handler] of this.#handlers.get (cell).entries()){
                cell.addEventListener (eventName, handler)
            }
        })
    }
}