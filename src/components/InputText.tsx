import { Flex, Box, Stack, Button, Heading, Textarea, Text, useColorModeValue } from '@chakra-ui/react';

type Props = {
    onSubmit: (value: string) => void
}

export default function InputText({ onSubmit }: Props) {

    const bgBox = useColorModeValue('white', 'gray.700');
    const bgFlex = useColorModeValue('gray.50', 'gray.800');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const form = e.currentTarget;
        const message = form.elements.namedItem('message') as HTMLTextAreaElement;
        onSubmit(message.value);
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
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
                    <Stack align={'center'}>
                        <Heading fontSize={'2xl'}>Enter Text</Heading>
                        <Text color={'gray.500'} maxW={'3xl'}>
                            A like-chatbot typing experience
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={bgBox}
                        boxShadow={'lg'}
                        p={8}
                    >
                        <Textarea
                            rows={10}
                            id="message"
                            name="message"
                            placeholder="Enter text here"
                            value={`This sunny and spacious room is for those traveling light and looking for a comfy and cosy place to lay their head for a night or two. This beach house sits in a vibrant neighborhood littered with cafes, pubs, restaurants and supermarkets and is close to all the major attractions such as Edinburgh Castle and Arthur's Seat.
                            `}
                        />
                        <Button type="submit" mt={4} colorScheme="teal" size="lg" >
                            Start Typing
                        </Button>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}