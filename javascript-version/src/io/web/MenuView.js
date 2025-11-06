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
        const msg = document.createElement ("h2")
        msg.innerText = message
        msg.id = "msg"
        msg.classList.add ("mt-12")
        title.after (msg)
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
        input.classList.add ("focus:border-red-400", "focus:ring-red-300", "border-red-400")
        if (input.nextElementSibling?.tagName !== "P") {
            const errorMsg = document.createElement ("p")
            errorMsg.innerText = message
            errorMsg.setAttribute ("class", "text-red-400 text-xs mt-1 errorMsg")
            input.after (errorMsg)
        }
        else 
            input.nextElementSibling.innerText = message
    }

    removeError (input) {

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