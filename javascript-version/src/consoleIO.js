export default class ConsoleIO {
    constructor (prompt) {
        this.prompt = prompt 
    }

    read (message) {
        return this.prompt (message)
    }

    write (message) {
        console.log (message)
    }

    shutDown () {
        process.exit ()
    }
}