export default class Person {
    #name;
    #symbol;

    /**
     * @param {string} name 
     * @param {string} symbol 
     * @param {string} existingName 
     * @param {string} existingSymbol 
     */
    constructor (name, symbol, existingName="", existingSymbol="") {
        const nameValidation = Person.validName (name, existingName)
        this.#name = nameValidation.valid ? nameValidation.name : ""
        const symbolValidation = Person.validSymbol (symbol, existingSymbol)
        this.#symbol = symbolValidation.valid ? symbolValidation.symbol : ""
        this._score = 0
        this._game = 0
    }

    /**
     * @static
     * @param {string} name 
     * @param {string} existingName 
     * @returns {{valid:boolean, errorMessage?:string, name?:string}}
     */
    static validName (name, existingName) {
        if (name.trim ().toLowerCase () === existingName.trim ().toLowerCase ()) { 
            return {valid : false, errorMessage : "nom existe deja !"} 
        } 
        else if (!isNaN(Number.parseInt(name))) {
            return {valid : false, errorMessage : "nom invalide ! on peut pas mettre que des chiffres ou commencer avec !"}
        } 
        else if (name.length < 4){
            return {valid : false, errorMessage : "nom invalide (une longueur minimum de 4 lettre) !"}
        }
        else return {valid : true, name}
    }

    /**
     * @static
     * @param {string} symbol 
     * @param {string} existingSymbol 
     * @returns {{valid:boolean, errorMessage?:string, symbol?:string}}
     */
    static validSymbol (symbol, existingSymbol) {
        if (symbol.trim ().toLowerCase () === existingSymbol.trim ().toLowerCase ()) {
            return {valid : false, errorMessage : "symbol existe deja !"}            
        }
        else if (!isNaN(Number (symbol))) {
            return {valid : false, errorMessage : "Syntaxe invalid (pas de chiffre) !"}            
        }
        else if (symbol.length !== 1){
            return {valid : false, errorMessage : "il faut que la longeur égale à 1 !"}            
        }
        else return {valid : true, symbol}
    }

    get _name () {
        return this.#name[0].toUpperCase () + this.#name.slice (1).toLowerCase ()
    }

    get _symbol () {
        return this.#symbol
    }

    /**
     * @param {string} newSymbol 
     * @param {string} existingSymbol 
     */
    _updateSymbol (newSymbol, existingSymbol) {
        if (Person.validSymbol (newSymbol, existingSymbol).valid) {
            this.#symbol = newSymbol
        }
        else throw new SyntaxError ("Symbol invalide")
    }
}