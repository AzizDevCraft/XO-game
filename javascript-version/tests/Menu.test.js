import Menu from "../src/Menu.js"

describe ("tester la methode validChoice", () => {

    test.each ([
        [1, [1, 2], 1],
        ["b", ["a", "b"], "b"],
        ["1", ["1", "2"], 1],
        ["1", [1, 2], 1],
    ]) ("valider %option dans %validOptions", (option, validOptions, expectValue) => {
        expect (Menu.validChoice (option, validOptions)).toBe (expectValue)
    })
    
    test ("cas choix invalide", () => {
        expect (() => Menu.validChoice (3, [1, 2])).toThrow ("choix invalide !")
    })

    test ("type invalide", () => {
        expect (() => Menu.validChoice (true, [true, false])).toThrow ("choix invalide !")
    })
    
    test ("cas choix invalide (validOptions)", () => {
        expect (() => Menu.validChoice (1)).toThrow ()
    })
})

test ("validation class avec valeur par defaut", () => {
    const menu = new Menu ()
    expect (menu.mainMenu).toEqual (expect.any (String))
    expect (menu.endMenu).toEqual (expect.any (String))
    expect (menu.promptMessage).toMatch ("choisissez une option : ")
})

test ("validation class avec valeur fournit", () => {
    const menu = new Menu ("Bienvenu", "Au Revoir")
    expect (menu.mainMenu).toMatch ("Bienvenu")
    expect (menu.endMenu).toMatch ("Au Revoir")
})