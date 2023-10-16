import {ExcelRow} from "../excel-dropzone";
import scores from "../scores";
import users from "../users";

export function initialData(): ExcelRow[] {

    const groupedScores: Map<number, number[]> = new Map()

    scores.forEach((userScore) => {
        const existing = groupedScores.get(userScore.userId) || []
        groupedScores.set(userScore.userId, [...existing, userScore.score])
    })

    const allScoresForEachUser = users.flatMap((user) => {
        const allScores = groupedScores.get(user._id) || []
        return allScores.map((score): ExcelRow => ({
            name: user.name, score
        }))
    })

    return allScoresForEachUser
}
