import {initialData} from "./initial-data";

describe("initialData", () => {
    const scores = [
        {userId: 1, score: 22},
        {userId: 2, score: 96},
        {userId: 3, score: 1}
    ]
    const users = [
        {name: "Mary", _id: 1},
        {name: "Hugo", _id: 2},
        {name: "Charles", _id: 3}
    ]
    it("should combined users and scores", () => {
        const data = initialData(scores, users)
        expect(data).toEqual([
            {name: "Mary", score: 22},
            {name: "Hugo", score: 96},
            {name: "Charles", score: 1}
        ])
    })
})
