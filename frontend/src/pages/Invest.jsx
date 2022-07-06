import {
  Container,
  Heading,
  Grid,
  GridItem,
  Box,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'

const Portfolio = () => {
  return (
    <Container maxW={'5xl'} p={4}>
      <Heading as='h1' size='2xl' pb={6}>
        Invest
      </Heading>

      <Grid
        templateAreas={`"top-title"
                        "sleepers-1"
                        "erratic-title"
                        "sleepers-2"
                        "earlies-title"
                        "sleepers-3"
                        "lates-title"
                        "sleepers-4"
                        "sleepdeprived-title"
                        "sleepers-5"
                        `}
        gridTemplateRows={'auto'}
        gridTemplateColumns={'auto'}
        gap='3'
      >
        <GridItem area={'top-title'}>
          <Flex>
            <Heading as='h2' size='lg'>
              Top sleepers
            </Heading>
            <Spacer/>
            <Text>See more <ArrowForwardIcon /></Text>
          </Flex>
        </GridItem>
        <GridItem area={'sleepers-1'}>
          <Flex>
            <Box boxShadow='base' p='6' rounded='md' bg='white'>
              Base
            </Box>
            <Spacer/>
            <Box boxShadow='base' p='6' rounded='md' bg='white'>
              Base
            </Box>
            <Spacer/>
            <Box boxShadow='base' p='6' rounded='md' bg='white'>
              Base
            </Box>
            <Spacer/>
            <Box boxShadow='base' p='6' rounded='md' bg='white'>
              Base
            </Box>
            <Spacer/>
            <Box boxShadow='base' p='6' rounded='md' bg='white'>
              Base
            </Box>
            <Spacer/>
            <Box boxShadow='base' p='6' rounded='md' bg='white'>
              Base
            </Box>
            <Spacer/>
            <Box boxShadow='base' p='6' rounded='md' bg='white'>
              Base
            </Box>
            <Spacer/>
            <Box boxShadow='base' p='6' rounded='md' bg='white'>
              Base
            </Box>
          </Flex>
        </GridItem>
        <GridItem area={'erratic-title'}>
          <Flex>
            <Heading as='h2' size='lg'>
              Erratic sleepers
            </Heading>
            <Spacer/>
            <Text>See more <ArrowForwardIcon /></Text>
          </Flex>
        </GridItem>
        <GridItem area={'sleepers-2'}>
          <Box boxShadow='base' p='6' rounded='md' bg='white'>
            Base
          </Box>
        </GridItem>
        <GridItem area={'earlies-title'}>
          <Flex>
            <Heading as='h2' size='lg'>
              Early sleepers
            </Heading>
            <Spacer/>
            <Text>See more <ArrowForwardIcon /></Text>
          </Flex>
        </GridItem>
        <GridItem area={'sleepers-3'}>
          <Box boxShadow='base' p='6' rounded='md' bg='white'>
            Base
          </Box>
        </GridItem>
        <GridItem area={'lates-title'}>
          <Flex>
            <Heading as='h2' size='lg'>
              Late sleepers
            </Heading>
            <Spacer/>
            <Text>See more <ArrowForwardIcon /></Text>
          </Flex>
        </GridItem>
        <GridItem area={'sleepers-4'}>
          <Box boxShadow='base' p='6' rounded='md' bg='white'>
            Base
          </Box>
        </GridItem>
        <GridItem area={'sleepdeprived-title'}>
          <Flex>
            <Heading as='h2' size='lg'>
              Sleep deprived sleepers
            </Heading>
            <Spacer/>
            <Text>See more <ArrowForwardIcon /></Text>
          </Flex>
        </GridItem>
        <GridItem area={'sleepers-5'}>
          <Box boxShadow='base' p='6' rounded='md' bg='white'>
            Base
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
};

export default Portfolio