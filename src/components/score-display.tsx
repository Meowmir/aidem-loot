import React, {useState} from "react";
import {Box} from "@northlight/ui";
import {ListItem, UnorderedList,} from '@chakra-ui/react'

import {ExcelRow} from "../excel-dropzone";

export default function ScoreDisplay({highestScores, groupedScores}: {
    highestScores: ExcelRow[],
    groupedScores: Map<string, number[]>
}) {

    const sortedScores = highestScores.sort((a, b) => a.score < b.score ? 1 : -1)
    const [showUserScores, setShowUserScores] = useState<string | null>(null)

    return (
        <>
            <Box border="1px solid black" borderRadius="5" padding="5">
                <h4><b>HIGHSCORES</b></h4>
                <UnorderedList>
                    {sortedScores.map(({name, score}, i) => (
                        <ListItem onClick={() => setShowUserScores(name)} key={i}>{name} - {score}
                            {name === showUserScores ? <UnorderedList>
                                {groupedScores.get(name)?.map((score, index) =>
                                    <ListItem key={index}>{score}</ListItem>)}
                            </UnorderedList> : null}
                        </ListItem>
                    ))}
                </UnorderedList>
            </Box>
        </>
    )
}
