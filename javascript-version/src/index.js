import PromptSync from "prompt-sync"
import Person from "../src/Person.js"
import Menu from "../src/Menu.js"
import Board from "../src/Board.js"
import Game from "../src/Game.js"
import ConsoleIO from "./consoleIO.js"

const prompt = PromptSync ()

export default class GameController {

    /**
     * @param {ConsoleIO} io 
     */
    constructor (io) {
        this.io = io
        this.board = new Board ()
        this.players = []
        this.menu = new Menu ()
        this.game;
    }

    /**
     * input control
     * @param {string} message 
     * @param {(string, string) => {valid:boolean, errorMessage?:string}} validFunc 
     * @param {string} existingValue 
     * @returns {string}
     */
    askUntilValidPerson (message, validFunc, existingValue) {
        let input = this.io.read(message)
        while (!validFunc(input, existingValue).valid) {
            input = this.io.read(validFunc(input, existingValue).errorMessage +" essaye un autre : ")
        }
        return input.trim ()
    }

    askUntilValidChoice (message, validFunc, validOptions) {
        while (true) {
            let input = this.io.read(message)
            try {
                return validFunc (input, validOptions)
            }catch (e) {
                this.io.write (e.message)
            }
        }
    }

    startGame () {
        this.io.write (this.menu.mainMenu)
        const choix = Number (this.askUntilValidChoice (this.menu.promptMessage, Menu.validChoice, [1,2]))
        if (choix === 1) {
            this.io.write ("player 1 identifiez-vous :")
            const playerA = new Person (this.askUntilValidPerson ("Donner votre nom : ", Person.validName, ""), this.askUntilValidPerson ("choisissez votre symbol : ", Person.validSymbol, "").toUpperCase ())
            this.io.write ("player 2 identifiez-vous :")
            const playerB = new Person (this.askUntilValidPerson ("Donner votre nom : ", Person.validName, playerA._name), this.askUntilValidPerson ("choisissez votre symbol : ", Person.validSymbol, playerA._symbol).toUpperCase ())
            this.players.push (playerA, playerB)
            this.game = new Game (this.players, this.board)
        } else if (choix === 2) {
            this.quitGame ()
        }
    }

    // #playGame () {
    //     while (!this.#checkWin (this.board.board).result && !this.#checkDraw(this.board.board)) {
    //         this.#playTurn (this.currentPlayIndex)
    //     }

    //     if (this.#checkWin (this.board.board).result) this.#whoWins (this.#checkWin (this.board.board).combination)
    //     this.#endGame ()
    // }

    playGame () {
        this.io.write (this.board.toString ())
        let partyData = this.game.playTurn (this.io.read (`c'est le tour de ${this.players[this.game.currentPlayIndex]._name}, choisit une position : `))
        while ( partyData.status === "continue") {
            this.io.write (this.board.toString ())
            partyData = this.game.playTurn (this.io.read (`c'est le tour de ${this.players[this.game.currentPlayIndex]._name}, choisit une position : `))
        }
        if (partyData.status === "win") {
            this.io.write (`${partyData.winner._name} a gagné cette partie !`)
            this.io.write (this.board.toString ())
        }else if (partyData.status === "draw") {
            this.io.write ("égalité !")
        }
    }

    quitGame () {
        this.io.write ("Game Over")
        this.io.shutDown ()
    }
}

