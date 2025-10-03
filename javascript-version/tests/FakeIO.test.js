import FakeIO from "./FakeIO";

describe ("tester le Module FakeIO", () => {
    const io = new FakeIO ([1, "aziz"])

    test ("simulation input", () => {
        expect (io.read ('test')).toBe (1)
        expect (io.inputs).toEqual (["aziz"])
        expect (io.output).toHaveLength (1)
    })

    test ("simulation output", () => {
        io.write ("ceci est un test")
        expect (io.output).toContain ("ceci est un test")
        expect (io.output).toHaveLength (2)
    })

    test ("shutDwon methode", () => {
        io.shutDown ()
        expect(io.output.at (-1)).toMatch ("console fermer")
    })
}) 