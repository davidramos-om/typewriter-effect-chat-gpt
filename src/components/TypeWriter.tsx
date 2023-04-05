import { useEffect, useState } from "react";
import { Flex, Box, Stack, Button, Text, useColorModeValue } from '@chakra-ui/react';

type Props = {
    message: string,
    timestamp: number
}

let _typingDelay = 50;
let _typingPosition = 0;
let _typingCancelled = false;

const cb = (stop: boolean, character: string, pos: number, container: HTMLElement) => {
    if (stop)
        return;

    container!.innerHTML += character;
    _typingPosition = pos;
}

function typeMessage(message: string, restar: boolean) {

    if (!message)
        return;

    var container = document.getElementById("message-container");
    if (!container)
        return;

    if (!message) {
        container.innerHTML = "";
        return;
    }

    if (restar)
        container.innerHTML = "";

    const resumeFrom = _typingPosition <= 0 || _typingPosition >= message.length ? 0 : _typingPosition;
    for (let i = resumeFrom; i < message.length; i++) {

        if (_typingCancelled)
            return;

        const character = message[ i ];
        // lastPosition = i;


        //* set parameters to the callback function
        setTimeout(cb, i * _typingDelay, _typingCancelled, character, i, container);
    }
}

export default function TypeWriter({ message, timestamp }: Props) {

    const [ displayedMessage, setDisplayedMessage ] = useState('');
    const bgFlex = useColorModeValue('gray.50', 'gray.800');
    const bgBox = useColorModeValue('white', 'gray.700');
    const [ stopped, setStopped ] = useState(false);


    useEffect(() => {
        setDisplayedMessage(message);
    }, [ message ]);

    useEffect(() => {
        _typingPosition = 0;
        _typingCancelled = false;
        typeMessage(displayedMessage, true);
    }, [ timestamp, displayedMessage ]);

    useEffect(() => {

        if (stopped) {
            _typingCancelled = true;
        }
        else {
            _typingCancelled = false;
            typeMessage(displayedMessage, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ stopped ]);


    const handleTypingAction = () => {
        setStopped((prev) => !prev);
    }

    return (
        <Flex
            align={'center'}
            justify={'center'}
            bg={bgFlex}
        >
            <Stack
                spacing={8}
                mx={'auto'}
                maxW={'lg'}
                py={12}
                px={6}
            >
                <Button
                    variant={'outline'}
                    colorScheme="green"
                    width={'md'}
                    onClick={handleTypingAction}
                >
                    {stopped ? 'Resume Typing' : 'Stop Typing'}
                </Button>
                <Box
                    rounded={'lg'}
                    bg={bgBox}
                    boxShadow={'lg'}
                    p={8}
                >
                    <Text
                        id="message-container"
                        align={'left'}
                        whiteSpace={'pre-wrap'}
                        wordBreak={'break-all'}
                    >
                        {displayedMessage}
                    </Text>
                </Box>
            </Stack>
        </Flex>
    );
}