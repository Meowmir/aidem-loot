import {
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberInput,
    NumberInputField,
    useDisclosure
} from "@chakra-ui/react";
import {Button} from "@northlight/ui";
import React, {useState} from "react";
import {ExcelRow} from "../excel-dropzone";

export function FormModal({ onSave }: { onSave: (row : ExcelRow) => void }) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    const [username, setUsername] = useState('')
    const [score, setScore] = useState(0)

    function validate(name: string, score: number) {
        let error
        if (!name) {
            error = 'Name is required'
        } else if (!score) {
            error = 'Score is required'
        }
        return error
    }

    const handleClick = () => {
        const error = validate(username, score)
        if (error) {
            console.warn(error)
            return
        }
        onSave({ name: username, score })
        onClose()
    }

    return (
        <>
            <Button onClick={onOpen}>Add player</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Add player</ModalHeader>
                        <ModalCloseButton/>
                            <ModalBody>

                                <FormControl isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input placeholder='Username' onChange={(event) => setUsername(event.target.value)}/>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Score</FormLabel>
                                    <NumberInput placeholder='Score' onChange={(value) => setScore(Number(value))}>
                                        <NumberInputField/>
                                    </NumberInput>
                                </FormControl>


                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={handleClick}>
                                    Save
                                </Button>
                            </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    )
}
