const prompt = require ("prompt-sync") ();
const readline = require("readline");
const fs = require ("fs");


class Person {
    #name;
    #symbole;

    /**
     * @param {string} [existingName = ""] 
     * @param {string} [existingSymbol = ""]
     */
    constructor (existingName="", existingSymbol ="") {
        this.#name = this.askUntilValid ("Donner votre nom : ", this.#validName, existingName)
        this.#symbole = this.askUntilValid ("choisissez votre symbol : ", this.#validSymbol, existingSymbol)
        this._score = 0
    }

    /**
     * @private
     * @param {string} name 
     * @param {string} existingName 
     * @returns {{valid:boolean, errorMessage?:string}}
     */
    #validName (name, existingName) {
        if (name.trim ().toLowerCase () === existingName.trim ().toLowerCase ()) { 
            return {valid : false, errorMessage : "nom existe deja !"} 
        } 
        else if (!isNaN(Number.parseInt(name))) {
            return {valid : false, errorMessage : "nom invalide ! on peut pas mettre que des chiffres ou commencer avec !"}
        } 
        else if (name.length < 4){
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
     * @param {(string, sting) => {valid:boolean, errorMessage?:string}}} validFunc 
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

    get name () {
        return this.#name
    }

    get _symbol () {
        return this.#symbole
    }

    set _symbol (newSymbol) {
        this.#symbole = newSymbol
    }

    set _name (newName) {
        this.#name = newName
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
        this.db = fs.existsSync("history.json") ? 
            JSON.parse(fs.readFileSync ("history.json", "utf-8")) : 
                fs.writeFileSync ("history.json", JSON.stringify({}), "utf-8")
    }

    /**
     * @private
     * @param {Person} player 
     */
    #saveData (players) {
        for (let player of players) {
            this.db[player.name] = [player._symbol, player._score]
        }
        console.log (this.db)
        fs.writeFileSync("history.json", JSON.stringify (this.db, null, 2), "utf-8")
    }

    /**
     * @private
     * @param {Person} player 
     */
    #oldPlayer (player) {
        if (Object.keys(this.db)?.includes (player.name)) {
            console.log (`welcom back ${player.name}, your score for last parties is ${this.db[player.name][1]}`)
            if (player._symbol !== this.db[player.name][0]) {
                console.log (`Dans tes parties précedentes vous jouer avec ${this.db[player.name][0]}`)
                while (true) {
                    var response = prompt ("Si vous vouler changer tape (yes) or (no) : ").toLowerCase().trim()
                    if (response === "yes" || response === "no") break
                }
                if (response === "yes") {
                    console.log (`symbol changed to (${player._symbol})`)
                    this.db[player.name] = [player._symbol, this.db[player.name][1]]
                }else {
                    console.log (`Ok ! you conserve your last symbol (${this.db[player.name][0]})`)
                    player._symbol (this.db[player.name][0])
                }
            }
            player._score = this.db[player.name][1] 
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
            const playerB = new Person (this.players[0].name, this.players[0]._symbol)
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
        const pos = prompt (`c'est le tour de ${this.players[index].name}, choisit une position : `)
        this.board.updateBoard (pos, this.players[index]._symbol)
        this.currentPlayIndex = Math.abs (index - 1)
    }

    #whoWins (combinaison) {
        const who = this.players.find (item => item._symbol === this.board.board[combinaison[0]])
        who._score += 1
        console.log (`${who.name} a gagné cette partie !`)
        this.board.displayBoard ()
    }

    /**
     * @param {Array<number|string>} board 
     * @returns {{combination? : number[], result : boolean}}
     */
    #checkWin (board) {
        const winsPossibilities = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
        for (let win of winsPossibilities) {
            const ref = board [win [0]]
            let test = true
            for (let _ of win) {
                if (board [_] !== ref)  test = false 
            }
            if (test) return {combination : win, result : true}
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
        this.#whoWins (this.#checkWin (this.board.board).combination)
        this.#saveData (this.players)
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
// const player2 = new Person (player1.name, player1.symbol)

// const openning = new Menu ()
// openning.displayMainMenu ()
// openning.displayEndMenu ()

// const schema = new Board ()
// schema.updateBoard ("2", "X")
// schema.updateBoard ("2", "O")
// schema.displayBoard ()

const tictac = new Game ()
tictac.startGame ()