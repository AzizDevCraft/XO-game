export default class Menu {

    #mainMenu;
    #endMenu;
    #promptMessage;

    constructor (mainMenu = "", endMenu = "") {
        this.#mainMenu = mainMenu || `
Bienvenue à X - O game
  1. Start the game 
  2. Quit the game`
        this.#endMenu = endMenu || `
Game Over !
  1. Restart Game
  2. Quit Game`
        this.#promptMessage = "choisissez une option : "
    }

    /**
     * @static
     * @param {number | string} option
     * @param {Array} validOptions
     * @returns {number}
     */
    static validChoice (option, validOptions) {
        if (!Array.isArray (validOptions)) {
            throw new TypeError ("validOptions doit seulement être de type Array")
        }
        if (typeof option !== "number" && typeof option !== "string") {
            throw new SyntaxError ("choix invalide !")
        }
        validOptions = validOptions.map (item => !isNaN (item)? Number (item) : item )
        if (!isNaN (option)) option = Number (option)
        if (!validOptions.includes (option)) {
            throw new Error ("choix invalide !")
        }
        return option
    }

    get mainMenu () {
        return this.#mainMenu
    }
    
    get endMenu () {
        return this.#endMenu
    }
    
    get promptMessage () {
        return this.#promptMessage
    }
}