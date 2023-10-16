import React, {ReactNode, useState} from 'react'
import {ChakraProvider, Link} from '@chakra-ui/react'
import {Box, Container, H1, H2, HStack, P, VStack} from '@northlight/ui'
import {palette} from '@northlight/tokens'
import {ExcelDropzone, ExcelRow} from './excel-dropzone.jsx'
import ScoreDisplay from "./components/score-display";
import {FormModal} from "./components/form-modal";
import {initialData} from "./functions/initial-data";
import {groupData} from "./functions/group-data";
import scores from "./scores";
import users from "./users";

interface ExternalLinkProps {
    href: string,
    children: ReactNode,
}

const ExternalLink = ({href, children}: ExternalLinkProps) => <Link href={href} isExternal sx={{
    color: palette.blue['500'],
    textDecoration: 'underline'
}}>{children}</Link>

const initialScores = initialData(scores, users)

export default function App() {
    const [droppedData, setDroppedData] = useState<ExcelRow[]>(initialScores)

    function handleSheetData(data: ExcelRow[]) {
        setDroppedData(previousData => [...previousData, ...data])
    }

    const [groupedNewScores, highestScoreFromNewData] = groupData(droppedData)

    return (
        <ChakraProvider>
            <Container maxW="6xl" padding="4">
                <H1 marginBottom="4">Mediatool exercise</H1>
                <HStack spacing={10} align="flex-start">
                    <ExcelDropzone
                        onSheetDrop={handleSheetData}
                        label="Import excel file here"
                    />
                    <VStack align="left">
                        <Box>
                            <H2>Initial site</H2>
                            <P>
                                Drop the excel file scores.xlsx that you will find
                                in this repo in the area to the left and watch the log output in the console.
                                We hope this is enough to get you started with the import.
                            </P>
                        </Box>
                        <Box>
                            <H2>Styling and Northlight</H2>
                            <P>
                                Styling is optional for this task and not a requirement. The styling for this app is
                                using
                                our own library Northligth which in turn is based on Chakra UI.
                                You <i>may</i> use it to give some style to the application but again, it is entierly
                                optional.
                            </P>
                            <P>
                                Checkout <ExternalLink href="https://chakra-ui.com/">Chackra UI</ExternalLink> for
                                layout components such
                                as <ExternalLink href="https://chakra-ui.com/docs/components/box">Box</ExternalLink>
                                , <ExternalLink href="https://chakra-ui.com/docs/components/stack">Stack</ExternalLink>
                                , <ExternalLink href="https://chakra-ui.com/docs/components/grid">Grid</ExternalLink>
                                , <ExternalLink
                                href="https://chakra-ui.com/docs/components/flex">Flex</ExternalLink> and others.
                            </P>
                            <P>
                                Checkout <ExternalLink href="https://northlight.dev/">Northlight</ExternalLink> for
                                some of our components.
                            </P>
                        </Box>
                        <FormModal onSave={(row) => setDroppedData(previousData => [...previousData, row])}/>
                        <ScoreDisplay highestScores={highestScoreFromNewData} groupedScores={groupedNewScores}/>
                    </VStack>
                </HStack>
            </Container>
        </ChakraProvider>
    )
}
