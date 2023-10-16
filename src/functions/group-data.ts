import {ExcelRow} from "../excel-dropzone";

export function groupData(droppedData: ExcelRow[]) : [Map<string, number[]>, ExcelRow[]]{

    const groupedNewScores = new Map()

    droppedData.forEach((user) => {
        const existing = groupedNewScores.get(user.name) || []
        groupedNewScores.set(user.name, [...existing, user.score].sort((a, b) => a < b ? 1 : -1))
    })

    const highestScoreFromNewData = [...groupedNewScores].map(([name, score]) => ({
        name, score: Math.max(...groupedNewScores.get(name))
    }))

    return [groupedNewScores, highestScoreFromNewData]
}
