import {
  Container,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react'

const Portfolio = () => {
  return (
    <Container maxW={'5xl'} p={4}>
      <Heading as='h1' pt={3} size='2xl' pb={8}>
        Sleeper's (be name later) Logs
      </Heading>

      <Button>what time did you sleep last night</Button>
      
      <Text>here's graphs of the times youve been sleeping and your hours of sleep</Text>

      <Button>here's your sleeping info as an investor</Button>

    </Container>
  )
};

export default Portfolio