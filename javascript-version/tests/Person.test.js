import Person from "../src/core/Person.js"

describe ("validation de nom", () => {
    test ("refuse un nom trop court et renvoie le bon message", () => {
        const resultat = Person.validName ("ali", "")
        expect (resultat.valid).toBeFalsy() 
        expect (resultat.errorMessage).toMatch ("nom invalide (une longueur minimum de 4 lettre) !")   
    })
    
    test ("refuser un nom qui commence avec des chiffres et renvoie le bon message", () => {
        const resultat = Person.validName ("123Amine", "")
        expect (resultat.valid).toBeFalsy()  
        expect (resultat.errorMessage).toMatch ("nom invalide ! on peut pas mettre que des chiffres ou commencer avec !")  
    })
    
    test ("refuse un nom contient que des chiffres et renvoie le bon message", () => {
        const resultat = Person.validName ("1234", "")
        expect (resultat.valid).toBeFalsy()
        expect (resultat.errorMessage).toMatch ("nom invalide ! on peut pas mettre que des chiffres ou commencer avec !")    
    })
    
    test ("refuse un nom qui existe déjà et renvoie le bon message", () => {
        const resultat = Person.validName ("aziz", "aziz")
        expect (resultat.valid).toBeFalsy()    
        expect (resultat.errorMessage).toMatch ("nom existe deja !")
    })
    
    test ("accepte nom valid et renvoie la bonne valeur", () => {
        const resultat = Person.validName ("aziz", "")
        expect (resultat.valid).toBeTruthy()
        expect (resultat.name).toMatch("aziz")    
    })
    test ("accepte nom valid avec un existing name différent qu'une chaine vide et renvoie la bonne valeur", () => {
        const resultat = Person.validName ("aziz", "Ouss")
        expect (resultat.valid).toBeTruthy()
        expect (resultat.name).toMatch("aziz")    
    })
})

describe ("validation de symbole", () => {
    test ("refuser le symbole qui dépasse un seul caractère et renvoie le bon message", () => {
        const resultat = Person.validSymbol ("XX", "")
        expect (resultat.valid).toBeFalsy ()
        expect (resultat.errorMessage).toMatch ("il faut que la longeur égale à 1 !")
    })

    test ("refuser un symbole qui est composé de chiffre et renvoie le bon message", () => {
        const resultat = Person.validSymbol ("1", "")
        expect (resultat.valid).toBeFalsy ()
        expect (resultat.errorMessage).toMatch ("Syntaxe invalid (pas de chiffre) !")
    })
    
    test ("refuser un symbole déjà existant et renvoie le bon message", () => {
        const resultat = Person.validSymbol ("X", "X")
        expect (resultat.valid).toBeFalsy ()
        expect (resultat.errorMessage).toMatch ("symbol existe deja !")
    })
    
    test ("accepter un symbole qui est valide", () => {
        const resultat = Person.validSymbol ("X", "O")
        expect (resultat.valid).toBeTruthy ()
        expect (resultat.symbol).toMatch ("X")
    })
})

describe ("Validation class", () => {
    
    let player;

    beforeEach (() => {
        player = new Person ("OUSS", "M")
    })
    
    test ("cas de création d'instance valide", () => {
        expect (player._name).toMatch ("Ouss")
        expect (player._symbol).toMatch ("M")
        expect (player._score).toBe (0)
        expect (player._game).toBe (0)
    })

    test ("cas de changement de symbole", () => {
        player._updateSymbol ("N", player._symbol)
        expect (player._symbol).toMatch ("N")
    })

    test ("cas invalid de changement de symbole", () => {
        expect (() => player._updateSymbol ("M", player._symbol)).toThrow ("Symbol invalide")
    })
})