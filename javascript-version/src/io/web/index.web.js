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
        this.gameParty = new Game (this.players, this.board)
        this.gameInterface.displayTurn (this.players[0]._name, this.players[0]._symbol)
    }

    endGame () {
        this.gameInterface.disableInteractions ()
    }

    /**
     * @param {PointerEvent} event 
     */
    #onClickCell (event) {
        const symbol = this.players[this.gameParty.currentPlayIndex]._symbol 
        const position = Number (event.currentTarget.dataset.position) + 1 
        const partyData = this.gameParty.playTurn(position)
        this.gameInterface.updateBoardCell (symbol, position)
        if (partyData.status === "win") {
            this.gameInterface.showWinner (partyData.combo)
            this.endGame ()
        } else if (partyData.status === "draw") {
            this.endGame ()
        } else {
            this.gameInterface.displayTurn (this.players[this.gameParty.currentPlayIndex]._name, this.players[this.gameParty.currentPlayIndex]._symbol )
        }
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
                document.activeElement.blur()
            }else {
                form.setAttribute ("hidden", "")
                this.playGame ()
            }
        }
    }
}