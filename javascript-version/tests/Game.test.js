import Game from "../src/core/Game.js"
import Person from "../src/core/Person.js"
import Board from "../src/core/Board.js"

let joueurs, plateau, jeux;

beforeEach (() => {
    joueurs = [new Person ("joueur1", "X"), new Person ("joueur2", "O")]
    plateau = new Board ()
    jeux = new Game (joueurs, plateau)
})


describe ("tester la création de l'objet Game", () => {

    test ("Happy Path", () => {
        expect (() => new Game (joueurs, plateau)).not.toThrow ()
    })

    test ("refuser un plateau de dimension autre", () => {
        const plateau = [[1,2,3,4], [5,6,7,8], [9,10,11,12], [13,14,15,16]]
        expect (() => new Game (joueurs, plateau)).toThrow ("Le plateau ne correspond pas à un plateau XO (3x3) !")
    })
    
    test ("refuser un plateau de dimension autre", () => {
        const joueurs = [["joueur1", "X"], ["joueur2", "O"]]
        expect (() => new Game (joueurs, plateau)).toThrow ("Les joueurs ne correspond pas au norme attendu !")
    })

    test ("tester les combinaisons pour gagner", () => {
        const jeux = new Game (joueurs, plateau) 
        expect (jeux.winsCombination).toEqual ([[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]])
    })

    test ("refuser un partie sans joueurs", () => {
        expect (() => new Game ()).toThrow ()
    })
})

describe ("tester les condition d'arrêt de jeux", () => {

    const winsCombination = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    test ("valider tout les cas de wins", () => {
        const board = new Board ()
        for (let combo of winsCombination) {
            for (let i = 0; i < 3; i++) {
                board.updateBoard (combo[i]+1, "X")
            }
            expect (Game.checkWin (board.board, winsCombination).result).toBeTruthy ()
            expect (Game.checkWin (board.board, winsCombination).combination).toEqual (combo)
            board.resetBoard ()
        }  
    })

    test ("tester un cas non gagnant et non nul (seulement deux coups jouer)", () => {
        const board = [1, "X", 3, 4, "O", 6, 7, 8, 9]
        expect (Game.checkWin (board, winsCombination).result).toBeFalsy ()
        expect (Game.checkDraw (board, winsCombination)).toBeFalsy ()
    })
    
    test ("tester un cas nul et non gagnant", () => {
        const board = ["O", "X", "X", "X", "X", "0", "O", "O", "X"]
        expect (Game.checkDraw (board, winsCombination)).toBeTruthy ()
        expect (Game.checkWin (board, winsCombination).result).toBeFalsy ()
    })
    
    test ("il y a pas de nul lorsqu'un plateau est plein et gagnant", () => {
        const board = ["O", "X", "X", "X", "X", "0", "O", "O", "O"]
        expect (Game.checkDraw (board, winsCombination)).toBeFalsy ()
    })
    
    test ("tester un cas initial du plateau", () => {
        const board = [1,2,3,4,5,6,7,8,9]
        expect (Game.checkWin (board, winsCombination).result).toBeFalsy ()
        expect (Game.checkDraw (board, winsCombination)).toBeFalsy ()
    })

})

describe ("déroulement du jeux et changement de joueur", () => {

    afterEach (() => {
        jeux.board.resetBoard ()
    })

    test ("valider le changement de joueur", () => {
        jeux.playTurn (1)
        jeux.playTurn (2)
        expect (jeux.board.board).toEqual (["X","O",3,4,5,6,7,8,9])
    })

    test ("sénario X gagne", () => {
        for (let i=1; i<7; i++) {
            expect (jeux.playTurn(i).status).toMatch ("continue")
        }
        const result = jeux.playTurn(7)
        expect (result.status).toMatch ("win")
        expect (result.winner).toEqual (joueurs[0])
        expect (joueurs[0]._score).toBe (1)
        expect (joueurs[1]._score).toBe (0)
    })
    
    test ("sénario où il y a une égalité", () => {
        const moves = [2, 1, 3, 6, 4, 7, 5, 8]
        for (let i of moves) {
            expect (jeux.playTurn(i).status).toMatch ("continue")
        }
        expect (jeux.playTurn(9).status).toMatch ("draw")
    })
    
    test ("refuser une position non valide", () => {
        expect (() => jeux.playTurn(10)).toThrow ()
    })
    
    test ("ajout du game", () => {
        Game.increaseGames (joueurs)
        expect (joueurs[0]._game).toBe (1)
        expect (joueurs[1]._game).toBe (1)
    })
})