import {ExcelRow} from "../excel-dropzone";

export function groupData(droppedData: ExcelRow[]) : [Map<string, number[]>, ExcelRow[]]{

    const groupedNewScores = new Map()

    droppedData.forEach((user) => {
        const existing = groupedNewScores.get(user.name) || []
        groupedNewScores.set(user.name, [...existing, user.score].sort((a, b) => b - a))
    })

    const highestScoreFromNewData = [...groupedNewScores].map(([name, score]) => ({
        name, score: Math.max(...groupedNewScores.get(name))
    })).sort((a, b) => b.score - a.score)

    return [groupedNewScores, highestScoreFromNewData]
}
