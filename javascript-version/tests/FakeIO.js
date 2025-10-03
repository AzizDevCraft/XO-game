export default class FakeIO {
    constructor (inputs = []) {
        this.inputs = inputs
        this.output = []
    }

    read (message = "") {
        this.output.push (message)
        return this.inputs.shift ()
    }

    write (message) {
        this.output.push (message)
    }

    shutDown () {
        this.write ("console fermer")
    }
}