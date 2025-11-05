export default class MenuView {

    constructor (root = document.body) {
        this.root = root
    }

    renderTopBar () {
        const tplTopBar = this.root.querySelector ("#tpl-entete")
        const topBarFragment = tplTopBar.content.cloneNode (true)
        this.root.append (topBarFragment)
    }

    displayMainMenu (menu) {
        const title = this.root.querySelector ("#title")
        const msg = document.createElement ("h2")
        msg.innerText = menu
        msg.id = "msg"
        title.after (msg)
        this.root.querySelector ("#player-register").removeAttribute ("hidden")
    }

    displayEndGame (menu) {
        this.root.querySelector ("#msg").innerText = menu
        this.buttons = this.root.querySelector ("#choice")
        this.buttons.removeAttribute ("hidden") 
        this.buttons.firstElementChild.innerText = "Restart Game"
        this.buttons.lastElementChild.removeAttribute ("hidden")
    }

    reset () {
        this.root.querySelector ("#msg").remove ()
        this.root.querySelector ("#player-register").setAttribute ("hidden", "")
        this.buttons.lastElementChild.setAttribute ("hidden", "")
        this.buttons.firstElementChild.innerText = "Start Game"
    }
}