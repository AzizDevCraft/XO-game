import GameController from "../src/index.js"
import FakeIO from "./FakeIO"
import Person from "../src/Person.js"

describe.skip ("tester la validation des joueurs", () => {

    describe ("tester askUntilValidPerson", () => {
        test ("accepter un nom valide", () => {
            const IO = new FakeIO (["aziz"])
            const game = new GameController (IO)
            expect (game.askUntilValidPerson ("Donner votre nom : ", Person.validName, "")).toMatch ("aziz")
        })
        
        test ("refuser jusqu'à avoir un nom valid", () => {
            const IO = new FakeIO (["AZ", "1234", "12Aziz", "Ouss", "aziz", "Foulen"])
            const game = new GameController (IO)
            expect (game.askUntilValidPerson ("Donner votre nom : ", Person.validName, "Ouss")).toMatch ("aziz")
        })

        test ("accepter un symbole valide", () => {
            const IO = new FakeIO (["X"])
            const game = new GameController (IO)
            expect (game.askUntilValidPerson ("choisissez votre symbol : ", Person.validSymbol, "")).toMatch ("X")
        })
        
        test ("refuser jusqu'à avoir un symbole valid", () => {
            const IO = new FakeIO (["1", "AA", "X", "N", "O"])
            const game = new GameController (IO)
            expect (game.askUntilValidPerson ("choisissez votre symbol : ", Person.validSymbol, "X")).toMatch ("N")
        })
    })
    
    describe ("tester le debut du jeux", () => {
        test ("Happy Path", () => {
            const IO = new FakeIO ([1, "aziz", "X", "OUSS", "O"])
            const game = new GameController (IO)
            game.startGame ()

            expect (IO.output[0]).toContain ("Bienvenue à X - O game")

            const player = game.players[0]
            expect (player._name).toMatch("Aziz")
            expect (player._symbol).toMatch("X")
            expect (IO.inputs).toHaveLength (0)
            expect (IO.output).toHaveLength (8)

            expect (game.game.players).toEqual (game.players)
        })

        test ("refuser identique players", () => {
            const IO = new FakeIO ([1, "aziz", "X", "Aziz", "AZIZ", "OUss", "O"]) 
            const game = new GameController (IO)
            game.startGame ()
            const player2 = game.players [1]
            expect (player2._name).not.toMatch("Aziz")
            expect (IO.output).toHaveLength (10)
        })

        test ("refuser un nom non valide", () => {
            const IO = new FakeIO ([1, "AB", "12345", "12AZIZ", "Zizz123", "X", "Ouss", "O"]) 
            const game = new GameController (IO)
            game.startGame ()
            const player1 = game.players[0]
            expect (player1._name).toMatch("Zizz123")
            expect (player1._symbol).toMatch("X")
        })
        
        test ("refuser un symbol non valide", () => {
            const IO = new FakeIO ([1, "Aziz", "0", "ABC", "X", "Ouss", "X", "X", "O"]) 
            const game = new GameController (IO)
            game.startGame ()
            expect (game.players[0]._symbol).toMatch("X")
            expect (game.players[1]._symbol).toMatch("O")
        })

        test ("verifier le deuxième choix (choix = 2)", () => {
            const IO = new FakeIO ([2]) 
            const game = new GameController (IO)
            game.startGame ()
            expect (IO.output).toContain ("Game Over")
            expect (IO.output.at (-1)).toEqual ("console fermer")
        })
        
        test ("saisi de choix sous forme de String", () => {
            const IO = new FakeIO (["2"]) 
            const game = new GameController (IO)
            game.startGame ()
            expect (IO.output).toContain ("Game Over")
            expect (IO.output.at (-1)).toEqual ("console fermer")
        })
        
        test ("refuser un choix invalide", () => {
            const IO = new FakeIO (["3", 4, 2]) 
            const game = new GameController (IO)
            game.startGame ()
            expect (IO.output).toContain ("Game Over")
            expect (IO.output.at (-1)).toEqual ("console fermer")
        })
    })

})

describe.skip ("tester la partie", () => {
    const IO = new FakeIO ([1, "aziz", "X", "OUSS", "O"])
    const game = new GameController (IO)
    game.startGame ()

    test ("win moves for player 1", () => {
        IO.inputs.push ("1", "2", "3", "4", "5", "6", "7")
        game.playGame ()
        expect (IO.output.at (-2)).toMatch ("Aziz a gagné cette partie !")

    })
})