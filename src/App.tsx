import './App.css'
import { useState } from 'react';
import { Container, Heading, Stack, Text } from '@chakra-ui/react';

import InputText from './components/InputText';
import Typewriter from './components/TypeWriter';

function App() {

  const [ text, setText ] = useState<string>('');
  const [ timestamp, setTimestamp ] = useState<number>(0);

  const handleSubmit = (value: string) => {
    setText(value);
    setTimestamp(Date.now());
  }

  return (
    <>
      <Container maxW={'5xl'}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Typewriter{' '}
            <Text as={'span'} color={'teal.400'}>
              Chat GPT
            </Text>
          </Heading>
          <Stack
            spacing={6}
          >

            <InputText onSubmit={handleSubmit} />
            <Typewriter message={text} timestamp={timestamp} />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default App
