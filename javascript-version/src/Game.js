import Person from "../src/Person.js"
import Board from "../src/Board.js"

export default class Game {

    /**
     * @param {Person[]} players 
     * @param {Board} board 
     */
    constructor (players, board) {
        if (players.length !== 2 || !(players[0] instanceof Person) || !(players[1] instanceof Person)) {
            throw new TypeError ("Les joueurs ne correspond pas au norme attendu !")
        }
        
        if (!(board instanceof Board)) {
            throw new TypeError ("Le plateau ne correspond pas à un plateau XO (3x3) !")
        }
        this.players = players
        this.board = board
        this.currentPlayIndex = 0
        this.winsCombination = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    }

    /**
     * @param {number} position 
     * @returns {{status: string, winner? : Player}}
     */
    playTurn (position) {
        this.board.updateBoard(position, this.players[this.currentPlayIndex]._symbol);
        if (Game.checkWin(this.board.board, this.winsCombination)) {
            this.players[this.currentPlayIndex]._score += 1 
            return { status: "win", winner: this.players[this.currentPlayIndex] }
        }
        if (Game.checkDraw(this.board.board)) return { status: "draw" }
        this.switchPlayer (this.currentPlayIndex)
        return { status: "continue" }
    }

    switchPlayer () {
        this.currentPlayIndex = this.currentPlayIndex === 0 ? 1 : 0;
    }

    /**
     * @static
     * @param {Array<number|string>} board 
     * @returns {{combination? : number[], result : boolean}}
     */
    static checkWin (board, winsPossibilities) {
        for (let combo of winsPossibilities) {
            if (board [combo [0]] === board [combo [1]] && board [combo [1]] === board [combo [2]]) return { combination: combo, result: true }
        }
        return {result : false}
    }   
    
    /**
     * @static
     * @param {Array<number|string>} board 
     * @returns {boolean}
     */
    static checkDraw (board) {
        for (let box of board) {
            if (typeof box === "number") return false
        }
        return true
    }

    /**
     * @static
     * @param {Player[]} players 
     */
    static increaseGames (players) {
        players.forEach (player => player._game += 1)
    }

}