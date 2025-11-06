export default class MenuView {

    constructor (root = document.body) {
        this.root = root
    }

    renderTopBar () {
        const tplTopBar = this.root.querySelector ("#tpl-entete")
        const topBarFragment = tplTopBar.content.cloneNode (true)
        this.root.append (topBarFragment)

        this.form = this.root.querySelector ("#player-register")
    }

    displayMainMenu (message) {
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
        this.buttons = this.root.querySelector ("#choice")
        this.buttons.removeAttribute ("hidden") 
        this.buttons.firstElementChild.innerText = "Restart Game"
        this.buttons.lastElementChild.removeAttribute ("hidden")
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
        this.form.addEventListener ("submit", (event) => handler(event))
    }
}