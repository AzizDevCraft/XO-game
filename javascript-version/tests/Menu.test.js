import Menu from "../src/Menu.js"

describe ("tester la methode choice", () => {
    test ("cas valide (chiffre)", () => {
        expect (Menu.choice (1, [1, 2])).toBe (1)
    })
    
    test ("cas valide (chaine)", () => {
        expect (Menu.choice ("b", ["a", "b"])).toBe ("b")
    })

    test ("cas choix invalide", () => {
        expect (() => Menu.choice ("1", [1, 2])).toThrow ("choix invalide !")
    })
    
    test ("cas choix invalide", () => {
        expect (() => Menu.choice (3, [1, 2])).toThrow ("choix invalide !")
    })

    test ("type invalide", () => {
        expect (() => Menu.choice (true, [true, false])).toThrow ("choix invalide !")
    })
    
    test ("cas choix invalide (validOptions)", () => {
        expect (() => Menu.choice (1)).toThrow ()
    })
})

test ("validation class avec valeur par defaut", () => {
    const menu = new Menu ()
    expect (menu.mainMenu).toEqual (expect.any (String))
    expect (menu.endMenu).toEqual (expect.any (String))
})

test ("validation class avec valeur fournit", () => {
    const menu = new Menu ("Bienvenu", "Au Revoir")
    expect (menu.mainMenu).toMatch ("Bienvenu")
    expect (menu.endMenu).toMatch ("Au Revoir")
})