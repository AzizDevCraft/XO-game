export default class FakeIO {
    constructor (inputs = []) {
        this.inputs = inputs
        this.output = []
    }

    read (message = "") {
        return this.inputs.shift ()
    }

    write (message) {
        this.output.push (message)
    }
}