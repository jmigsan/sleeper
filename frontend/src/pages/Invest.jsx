import {
  Container,
  Heading,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react'

import SleepersList from '../components/Invest/SleepersList';

const Portfolio = () => {
  return (
    <Container maxW={'5xl'} p={4}>
      <Heading as='h1' pt={3} size='2xl' pb={3}>
        Invest
      </Heading>
      <Flex px={1} pb={2}>
        <Text>Sleeper:</Text>
        <Spacer/>
        <Text>Sleep Value:</Text>
      </Flex>
      <SleepersList/>
    </Container>
  )
};

export default Portfolio