import PromptSync from "prompt-sync"
import Person from "../src/Person.js"
import Menu from "../src/Menu.js"
import Board from "../src/Board.js"
import Game from "../src/Game.js"
import ConsoleIO from "./consoleIO.js"

const prompt = PromptSync ()

class GameController {

    /**
     * @param {ConsoleIO} io 
     */
    constructor (io) {
        this.io = io
        this.board = new Board ()
        this.players = []
        this.menu = new Menu ()
    }

    // #startGame () {
    //     const startMenu = new Menu ()
    //     const choice = startMenu.displayMainMenu ()
    //     if (choice === 2) this.#quitGame ()
    //     else {
    //         console.log ("player 1 identifiez-vous :")
    //         const playerA = new Person ()
    //         this.players.push (this.#oldPlayer (playerA))
    //         console.log ("player 2 identifiez-vous :")
    //         const playerB = new Person (this.players[0]._name, this.players[0]._symbol)
    //         this.players.push (this.#oldPlayer (playerB))
    //         return this.#playGame ()
    //     }
    // }

    /**
     * input control
     * @param {string} message 
     * @param {(string, string) => {valid:boolean, errorMessage?:string}} validFunc 
     * @param {string} existingValue 
     * @returns {string}
     */
    askUntilValid (message, validFunc, existingValue) {
        let input = this.io.read(message)
        while (!validFunc(input, existingValue).valid) {
            input = this.io.read(validFunc(input, existingValue).errorMessage +" essaye un autre : ")
        }
        return input.trim ()
    }

    startGame () {
        this.io.write (this.menu.mainMenu)
        const choix = this.io.read (this.menu.promptMessage)
        if (choix === 1) {
            this.io.write ("player 1 identifiez-vous :")
            const playerA = new Person (this.askUntilValid ("Donner votre nom : ", Person.validName, ""), this.askUntilValid ("choisissez votre symbol : ", Person.validSymbol, "").toUpperCase ())
            this.players.push (playerA)
        }
    }
}


const party = new GameController (new ConsoleIO (prompt))
party.startGame ()