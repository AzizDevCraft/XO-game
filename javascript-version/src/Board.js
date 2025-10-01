export default class Board {
    /**@type {Array.<number|string>} */
    #board 

    constructor () {
        this.#board = Array.from ({length : 9}, (_, i) => ++i)
    }

    toString () {
        const rowSeparator = "\n___|___|___\n"
        const rows = []
        for (let i=0; i<3; i++) {
            const row = this.#board.slice (i*3, i*3+3).join (" | ")
            rows.push (` ${row} `)
        }
        return rows.join (rowSeparator) + "\n   |   |   "
    }

    /**
     * @param {string | number} position 
     * @returns {boolean}
     */
    validPosition (position) {
        position = typeof position === "number"? position : Number (position)
        return (
            String(position).length === 1 &&
            !isNaN (position) &&
            position !== 0 &&
            typeof this.#board[position-1] === "number"
        )
    }

    #validSymbol (symbol) {
        return typeof symbol === "string" && symbol.length === 1 && isNaN (symbol) 
    }

    /**
     * @param {string | number} position 
     * @param {string} symbole 
     */
    updateBoard (position, symbole) {
        if (!this.#validSymbol (symbole)) {
            throw new Error ("invalid symbol !:")
        }else if (!this.validPosition (position)) {
            throw new Error ("invalid position !:")
        }
        this.#board.splice (Number(position)-1, 1, symbole)
    }

    resetBoard () {
        this.#board = Array.from ({length : 9}, (_, i) => ++i)
    }

    get board () {
        return this.#board 
    }
}

