import FakeIO from "./FakeIO";

describe ("tester le Module FakeIO", () => {
    const io = new FakeIO ([1, "aziz"])

    test ("simulation input", () => {
        expect (io.read ()).toBe (1)
        expect (io.inputs).toEqual (["aziz"])
    })

    test ("simulation output", () => {
        io.write ("ceci est un test")
        expect (io.output).toContain ("ceci est un test")
    })
}) 