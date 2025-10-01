import Board from "../src/Board.js"

describe ("les action valide de board", () => {
    const board = new Board ()

    test ("valider l'affichage", () => {
        const boardRef = " 1 | 2 | 3 \n___|___|___\n 4 | 5 | 6 \n___|___|___\n 7 | 8 | 9 \n   |   |   "
        expect (board.toString ()).toMatch (boardRef)
    })

    test ("board initial", () => {
        expect (board.board).toEqual ([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    test ('affichage correcte après mise à jour', () => {
        board.updateBoard (5, "X")
        const boardRef = " 1 | 2 | 3 \n___|___|___\n 4 | X | 6 \n___|___|___\n 7 | 8 | 9 \n   |   |   "
        expect (board.toString ()).toMatch (boardRef)
    })
    
})

describe ("test de la methode valid Position", () => {
    const board = new Board ()

    test ("accepter une position valide", () => {
        expect (board.validPosition (3)).toBeTruthy ()
    })

    test ("refuser une position en chaine de caractère", () => {
        expect (board.validPosition ("3")).toBeTruthy ()
    })

    test ("refuser une position de deux chiffres", () => {
        expect (board.validPosition (10)).toBeFalsy ()
    })
    
    test ("refuser une position null", () => {
        expect (board.validPosition (0)).toBeFalsy ()
    })
    
    test ("refuser une position en chaine de caractère", () => {
        expect (board.validPosition ("A")).toBeFalsy ()
    })
    
    test ("refuser une position déjà utiliser", () => {
        board.updateBoard (2, "X")
        expect (board.validPosition (2)).toBeFalsy ()
    })

    test ("resfuser une position undefined", () => {
        expect (board.validPosition ()).toBeFalsy ()
    })

    test ("refuser une position négative", () => {
        expect (board.validPosition (-2)).toBeFalsy ()
    })
    
    test ("refuser une position décimal", () => {
        expect (board.validPosition (2.5)).toBeFalsy ()
    })
    
})

describe ("tester les methodes update et reset board", () => {
    const board = new Board ()

    test ('accepter une position valide', () => {
        board.updateBoard (5, "X")
        expect (board.board.indexOf ("X")).toBe (4)
    })
    
    test ('refuser un symbol numérique', () => {
        expect (() => board.updateBoard (2, 1)).toThrow ()
    })
    
    test ('refuser un symbol avec plus de caractère', () => {
        expect (() => board.updateBoard (2, "AA")).toThrow ()
    })
    
    test ('refuser un symbol numérique mais introduit dans une chaine', () => {
        expect (() => board.updateBoard (2, "1")).toThrow ()
    })

    test ("refuser un position invalide", () => {
        expect (() => board.updateBoard (5, "O")).toThrow ()
    })

    test ("reset board", () => {
        board.resetBoard ()
        expect (board.board).toEqual ([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
})