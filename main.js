const prompt = require ("prompt-sync") ();
const fs = require ("fs");


class Person {
    #_name;
    #symbole;

    /**
     * @param {string} [existingName = ""] 
     * @param {string} [existingSymbol = ""]
     */
    constructor (existingName="", existingSymbol ="") {
        this.#_name = this.askUntilValid ("Donner votre nom : ", this.#validName, existingName)
        this.#symbole = this.askUntilValid ("choisissez votre symbol : ", this.#validSymbol, existingSymbol).toUpperCase ()
        this._score = 0
        this._game = 0
    }

    /**
     * @private
     * @param {string} _name 
     * @param {string} existingName 
     * @returns {{valid:boolean, errorMessage?:string}}
     */
    #validName (_name, existingName) {
        if (_name.trim ().toLowerCase () === existingName.trim ().toLowerCase ()) { 
            return {valid : false, errorMessage : "nom existe deja !"} 
        } 
        else if (!isNaN(Number.parseInt(_name))) {
            return {valid : false, errorMessage : "nom invalide ! on peut pas mettre que des chiffres ou commencer avec !"}
        } 
        else if (_name.length < 4){
            return {valid : false, errorMessage : "nom invalide (une longueur minimum de 4 lettre) !"}
        }
        else return {valid : true}
    }

    /**
     * @private
     * @param {string} symbol 
     * @param {string} existingSymbol 
     * @returns {{valid:boolean, errorMessage?:string}}
     */
    #validSymbol (symbol, existingSymbol) {
        if (symbol.trim ().toLowerCase () === existingSymbol.trim ().toLowerCase ()) {
            return {valid : false, errorMessage : "symbol existe deja !"}            
        }
        else if (!isNaN(Number (symbol))) {
            return {valid : false, errorMessage : "Syntaxe invalid (pas de chiffre) !"}            
        }
        else if (symbol.length !== 1){
            return {valid : false, errorMessage : "il faut que la longeur égale à 1 !"}            
        }
        else return {valid : true}
    }

    /**
     * input control
     * @param {string} message 
     * @param {(string, sting) => {valid:boolean, errorMessage?:string}} validFunc 
     * @param {string} existingValue 
     * @returns {string}
     */
    askUntilValid (message, validFunc, existingValue) {
        let input = prompt(message)
        while (!validFunc(input, existingValue).valid) {
            input = prompt(validFunc(input, existingValue).errorMessage +" essaye un autre : ")
        }
        return input.trim ()
    }

    get _name () {
        this.#_name = this.#_name[0].toUpperCase () + this.#_name.slice (1).toLowerCase ()
        return this.#_name
    }

    get _symbol () {
        return this.#symbole
    }

    set _symbol (newSymbol) {
        this.#symbole = newSymbol
    }
}

class Menu {

    /**
     * @private
     * @param {number[]} validOptions
     * @returns {number}
     */
    #choice (validOptions) {
        let choix = Number (prompt ("Choose one option : ").trim ())
        while (isNaN (choix) || !validOptions.includes (choix) ) {
            choix = Number (prompt ("choix invalid essaye un autre : "))
        }
        return choix
    }

    displayMainMenu () {
        console.log (`
Bienvenue à X - O game
  1. Start the game 
  2. Quit the game `)
        return this.#choice([1, 2])
    }

    displayEndMenu () {
        console.log (`
Game Over !
  1. Restart Game
  2. Quit Game`)
        return this.#choice ([1, 2])
    }
}

class Board {
    /**@type {Array.<number|string>} */
    #board 

    constructor () {
        this.#board = Array.from ({length : 9}, (_, i) => ++i)
    }

    displayBoard () {
        const rowSeparator = "\n___|___|___\n"
        const rows = []
        for (let i=0; i<3; i++) {
            const row = this.#board.slice (i*3, i*3+3).join (" | ")
            rows.push (` ${row} `)
        }
        console.log (rows.join (rowSeparator) + "\n   |   |   ")
    }

    /**
     * @private
     * @param {string} position 
     * @returns {boolean}
     */
    #validPosition (position) {
        position = Number (position);
        return (
            String(position).length === 1 &&
            !isNaN (position) &&
            position !== 0 &&
            typeof this.#board[position-1] === "number"
        )
    }

    /**
     * @param {string} position 
     * @param {string} symbole 
     */
    updateBoard (position, symbole) {
        while (!this.#validPosition (position)) {
            position = prompt ("invalid position ! try again :")
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

class Game {

    constructor () {
        this.players = []
        this.currentPlayIndex = 0
        this.board = new Board ()
        this.history = fs.existsSync("history.json") ? JSON.parse(fs.readFileSync ("history.json", "utf-8")) : {}
    }

    /**
     * @private
     * @param {Person} player 
     */
    #saveData (players) {
        for (let player of players) {
            this.history[player._name] = {"symbol" : player._symbol, "score" : player._score, "game" : player._game}
        }
        fs.writeFileSync("history.json", JSON.stringify (this.history, null, 2), "utf-8")
    }

    #changeSymbol (player) {
        let response = prompt ("Si vous vouler changer tape (yes) or (no) : ").toLowerCase().trim()
        while (response !== "yes" && response !== "no") {
            response = prompt ("Only (yes) or (no) : ").toLowerCase().trim()
        }
        if (response === "yes") {
            console.log (`symbol changed to (${player._symbol})`)
            this.history[player._name].symbol = player._symbol
        }else {
            if (this.players[0]._symbol === this.history[player._name].symbol) {
                console.log ("Malheureusement ce symbole est déjà utilisé :(")
            }else {
                console.log (`Ok ! you conserve your last symbol (${this.history[player._name].symbol})`)
                player._symbol = this.history[player._name].symbol
            }    
        }
    }

    /**
     * @private
     * @param {Person} player 
     */
    #oldPlayer (player) {
        if (Object.keys(this.history)?.includes (player._name)) {
            console.log (`welcome back ${player._name}, your score for last parties is ${this.history[player._name].score}`)
            if (player._symbol !== this.history[player._name].symbol) {
                console.log (`Dans tes parties précedentes vous jouer avec ${this.history[player._name].symbol}`)
                this.#changeSymbol (player)
            }
            player._score = this.history[player._name].score 
            return player
        }
        return player
    }

    startGame () {
        const startMenu = new Menu ()
        const choice = startMenu.displayMainMenu ()
        if (choice === 2) this.#quitGame ()
        else {
            console.log ("player 1 identifiez-vous :")
            const playerA = new Person ()
            this.players.push (this.#oldPlayer (playerA))
            console.log ("player 2 identifiez-vous :")
            const playerB = new Person (this.players[0]._name, this.players[0]._symbol)
            this.players.push (this.#oldPlayer (playerB))
            return this.#playGame ()
        }
    }

    /**
     * @param {number} index
     * @returns {Person}
     */
    #playTurn (index) {
        this.board.displayBoard ()
        const pos = prompt (`c'est le tour de ${this.players[index]._name}, choisit une position : `)
        this.board.updateBoard (pos, this.players[index]._symbol)
        this.currentPlayIndex = Math.abs (index - 1)
    }

    #whoWins (combinaison) {
        const who = this.players.find (item => item._symbol === this.board.board[combinaison[0]])
        who._score += 1
        console.log (`${who._name} a gagné cette partie !`)
        this.board.displayBoard ()
    }

    /**
     * @param {Array<number|string>} board 
     * @returns {{combination? : number[], result : boolean}}
     */
    #checkWin (board) {
        const winsPossibilities = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        for (let combo of winsPossibilities) {
            if (board [combo [0]] === board [combo [1]] && board [combo [1]] === board [combo [2]]) return { combination: combo, result: true }
        }
        return {result : false}
    }   
    
    #checkDraw (board) {
        for (let box of board) {
            if (typeof box === "number") return false
        }
        return true
    }

    #playGame () {
        while (!this.#checkWin (this.board.board).result && !this.#checkDraw(this.board.board)) {
            this.#playTurn (this.currentPlayIndex)
        }

        if (this.#checkWin (this.board.board).result) this.#whoWins (this.#checkWin (this.board.board).combination)
        this.#endGame ()
    }

    #endGame () {
        this.players[0]._game += 1
        this.players[1]._game += 1
        this.#saveData (this.players)
        console.log("        === Scoreboard ===")
        for (let [_name, detail] of Object.entries (this.history)) {
            console.log(`${_name}: ${detail.score} points (symbol: ${detail.symbol}) in ${detail.game} game`)
        }
        this.#restartGame ()
    }

    #restartGame () {
        const endMenu = new Menu ()
        const choice = endMenu.displayEndMenu ()
        if (choice === 1) {
            this.board.resetBoard ()
            return this.#playGame ()
        }
        return this.#quitGame ()
    }

    #quitGame () {
        console.log ("End Game !")
        process.exit ()
    }
}

// const player1 = new Person ()
// const player2 = new Person (player1._name, player1.symbol)

// const openning = new Menu ()
// openning.displayMainMenu ()
// openning.displayEndMenu ()

const schema = new Board ()
// schema.updateBoard ("2", "X")
// schema.updateBoard ("2", "O")
schema.displayBoard ()

// const tictac = new Game ()
// tictac.startGame ()