import WebIO from "./webIO.js"
import Person from "../../core/Person.js"
import Board from "../../core/Board.js"
import Game from "../../core/Game.js"


export default class WebController {
    
    constructor () {
        this.board = new Board ()
        this.players = []
        this.gameInterface = new WebIO ()
    }

    /**
     * input control
     * @param {(string, string) => {valid:boolean, errorMessage?:string}} validFn 
     * @param {string} input 
     * @param {string} existingValue 
     * @returns {string}
     */
    #askUntilValidPerson (validFn, input, existingValue) {
        if (!validFn (input, existingValue).valid) {
            this.gameInterface.displayErrorInput ()
        }
    }

    startGame () {
        this.gameInterface.bindEvents ({
            onClickCell : (event) => this.#onClickCell (event),
            onClickBtns : (event) => this.#onClickBtns (event), 
            onInput : (event) => this.#onInput (event),
            onSubmit : (event) => this.#onSubmit (event)
        })
        this.gameInterface.init ()

    }

    playGame () {

    }

    endGame () {

    }

    /**
     * @param {PointerEvent} event 
     */
    #onClickCell (event) {

    }

    /**
     * @param {PointerEvent} event 
     */
    #onClickBtns (event) {
        const btnClicked = event.target
        if (btnClicked === event.currentTarget.firstElementChild)
            this.gameInterface.displayMenu ("Bienvenue à X - O game! Player 1 identifiez-vous :", "begin")
        else {
            //la partie de quit Game 
        }
    }

    /**
     * @param {InputEvent} event 
     */
    #onInput (event) {
        const input = event.target
        let ref;
        let validFn;
        if (input.name === "playerName") {
            ref = !this.players.length? "" : this.players[0]._name
            validFn = Person.validName
        } else {
            ref = !this.players.length? "" : this.players[0]._symbol
            validFn = Person.validSymbol
        } 
        
        const response = validFn (input.value.trim (), ref)
        if (!response.valid) {
            this.gameInterface.displayErrorInput (input, response.errorMessage)
        }else {
            this.gameInterface.removeErrorInput (input)
        }
    }

    /**
     * @param {SubmitEvent} event 
     */
    #onSubmit (event) {
        event.preventDefault ()
        const form = event.currentTarget
        const data = new FormData (form)
        const playerName = data.get ("playerName")
        const playerSymbol = data.get ("playerSymbol")
        const errorInput = form.querySelector (".error-state")
        if (errorInput)
            errorInput.focus ()
        else {
            this.players.push (new Person (playerName, playerSymbol))
            form.reset ()
            if (this.players.length < 2) {
                this.gameInterface.displayMenu ("Bienvenue à X - O game! Player 2 identifiez-vous :", "begin")
            }else {
                form.setAttribute ("hidden", "")
            }
        }
    }
}