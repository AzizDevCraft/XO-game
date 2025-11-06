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

    displayMainMenu (message) {
        this.buttons.setAttribute ("hidden", "")
        const title = this.root.querySelector ("#title")
        let msg = title.nextElementSibling.tagName === "H2" ? title.nextElementSibling : undefined
        console.log (title.nextElementSibling.tagName)
        if (!msg) {
            msg = document.createElement ("h2")
            msg.id = "msg"
            msg.classList.add ("mt-12")
            title.after (msg)
        }
        msg.innerText = message  
        this.form.removeAttribute ("hidden")      
    }

    displayEndMenu (message) {
        this.root.querySelector ("#msg").innerText = message
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
        input.classList.add ("focus:border-red-400", "focus:ring-red-300", "border-red-400", "error-state")
        
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

    reset () {
        this.root.querySelector ("#msg")?.remove ()
        this.form.setAttribute ("hidden", "")
        this.buttons.lastElementChild.setAttribute ("hidden", "")
        this.buttons.firstElementChild.innerText = "Start Game"
    }

    /**
     * @param {Function} handler 
     */
    onInput (handler) {
        this.form.addEventListener ("change", (event) => handler(event))
    }

    onSubmit (handler) {
        this.form.addEventListener ("submit", (event) => handler (event))
    }

    onClickMenuBtns (handler) {
        this.buttons.addEventListener ("click", (event) => handler (event))
    }
}