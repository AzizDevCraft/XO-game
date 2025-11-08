export default class MenuView {

    constructor (root = document.body) {
        this.root = root
    }

    renderTopBar () {
        const tplTopBar = this.root.querySelector ("#tpl-entete")
        const topBarFragment = tplTopBar.content.cloneNode (true)
        this.root.append (topBarFragment)

        this.form = this.root.querySelector ("#player-register")
        this.buttons = this.root.querySelector ("#choice")
    }

    /**
     * @param {string} message 
     */
    displayMainMenu (message) {
        this.buttons.setAttribute ("hidden", "")
        this.title = this.root.querySelector ("#title")
        let msg = this.title.nextElementSibling.id === "welcome-msg" ? this.title.nextElementSibling : undefined
        if (!msg) {
            msg = document.createElement ("h2")
            msg.id = "welcome-msg"
            msg.classList.add ("mt-12")
            this.title.after (msg)
        }
        msg.innerText = message  
        this.form.removeAttribute ("hidden")      
    }

    /**
     * @param {string} playerName 
     * @param {string} playerSymbol 
     * @param {string} message 
     */
    displayMiddleParty (playerName, message) {
        let msg = this.title.nextElementSibling
        let player = msg.firstElementChild
        if (msg.id === "welcome-msg") {
            msg.remove ()
            msg = document.createElement ("h2")
            msg.id = "play-turn-msg"
            msg.classList.add ("mt-12")
            this.title.after (msg)
        } 
        msg.innerText = message
        player = document.createElement ("span")
        player.setAttribute ("class", "bg-blue-600 rounded-md px-2 py-1")
        msg.append (player)
        player.innerText = `${playerName}`
    }


    displayEndMenu () {
        this.buttons.removeAttribute ("hidden") 
        this.buttons.firstElementChild.innerText = "Restart Game"
        this.buttons.lastElementChild.removeAttribute ("hidden")
    }

    /**
     * @param {HTMLInputElement} input 
     * @param {string} message 
     */
    displayError (input, message) {
        input.classList.remove ("focus:border-white", "focus:ring-white", "border-slate-950")
        input.classList.add ("focus:border-red-400", "focus:ring-red-300", "border-red-400", "error-state", "animate-input-error")
        
        setTimeout(() => input.classList.remove("animate-input-error"), 600)
        
        if (input.nextElementSibling?.tagName !== "P") {
            const errorMsg = document.createElement ("p")
            errorMsg.innerText = message
            errorMsg.setAttribute ("class", "pl-4 text-red-400 text-xs")
            input.after (errorMsg)
        }
        else 
            input.nextElementSibling.innerText = message
    }

    /**
     * @param {HTMLInputElement} input 
     */
    removeError (input) {
        const errorMsg = input.nextElementSibling
        if (errorMsg) {
            input.classList.remove ("focus:border-red-400", "focus:ring-red-300", "border-red-400", "error-state")
            input.classList.add ("focus:border-white", "focus:ring-white", "border-slate-950")
            errorMsg.remove ()
        }
    }

    resetQuitGame () {
        this.root.querySelector ("#play-turn-msg")?.remove ()
        this.form.setAttribute ("hidden", "")
        this.buttons.lastElementChild.setAttribute ("hidden", "")
        this.buttons.firstElementChild.innerText = "Start Game"
    }

    resetRestartGame () {
        this.root.querySelector ("#welcome-msg")?.remove ()
        this.form.setAttribute ("hidden", "")
        this.buttons.setAttribute ("hidden", "")
    }

    /**
     * @param {Function} handler 
     */
    onInput (handler) {
        this.form.addEventListener ("change", (event) => handler(event))
    }

    /**
     * @param {Function} handler 
     */
    onSubmit (handler) {
        this.form.addEventListener ("submit", (event) => handler (event))
    }

    /**
     * @param {Function} handler 
     */
    onClickMenuBtns (handler) {
        this.buttons.addEventListener ("click", (event) => handler (event))
    }
}