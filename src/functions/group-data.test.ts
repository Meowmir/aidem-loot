import {ExcelRow} from "../excel-dropzone";
import {groupData} from "./group-data";

describe("groupData", () => {
    const rows: ExcelRow[] = [
        {name: "Red", score: 500},
        {name: "Red", score: 1000},
        {name: "Red", score: 400},
        {name: "Red", score: 700},
        {name: "Green", score: 800},
        {name: "Blue", score: 900},
        {name: "Blue", score: 600},
    ]
    it("should group scores by user", () => {
        const [grouped] = groupData(rows)
        expect(grouped.get("Red")).toEqual([1000, 700,  500, 400])
    })

    it("should return highest score for each user", () => {
        const [, highest] = groupData(rows)
        expect(highest).toEqual([
            {name: "Red", score: 1000},
            {name: "Blue", score: 900},
            {name: "Green", score: 800}
        ])
    })
    const rowsWithDuplicated: ExcelRow[] = [
        {name: "Red", score: 900},
        {name: "Red", score: 400},
        {name: "Red", score: 700},
        {name: "Green", score: 900},
        {name: "Blue", score: 900},
        {name: "Blue", score: 600},
    ]
    it("should correctly sort similar scores", () => {
        const [, highest] = groupData(rowsWithDuplicated)
        expect(highest).toEqual([
            {name: "Red", score: 900},
            {name: "Green", score: 900},
            {name: "Blue", score: 900},
        ])
    })
})
