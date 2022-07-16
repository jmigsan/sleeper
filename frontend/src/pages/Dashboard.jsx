import { 
  Grid, 
  GridItem, 
  Container, 
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Spacer
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import { ArrowForwardIcon } from '@chakra-ui/icons'

import DashboardGraph from '../components/Dashboard/DashboardGraph';
import DashboardPortfolio from '../components/Dashboard/DashboardPortfolio';
import DashboardInvest from '../components/Dashboard/DashboardInvest';

const Dashboard = () => {
  
  return (
    <Container maxW={'5xl'} p={4}>
      <Grid
        templateAreas={{base: `"graph"
                               "portfolio"
                               "invest"`,
                          md: `"graph      graph"
                               "portfolio  invest"`}}

        gridTemplateRows={'auto'}
        gridTemplateColumns={'auto'}
        gap='5'
        >
        <GridItem boxShadow='base' rounded='md' bg='white' area={'graph'}>
          <DashboardGraph />
        </GridItem>
        <GridItem area={'portfolio'}>
          <Heading as='h2' size='lg'>
            Portfolio
          </Heading>
          <Box pb={1}>
            <Link as={RouterLink} to='/portfolio'>
              <Text>View portfolio <ArrowForwardIcon /></Text>
            </Link>
          </Box>
          <Box boxShadow='base' rounded='md' bg='white' area={'portfolio'} p={3}>
            <Flex px={1} pb={2}>
              <Text>Sleeper:</Text>
              <Spacer/>
              <Text>Shares:</Text>
              <Spacer/>
              <Text>Investment:</Text>
            </Flex>
            <DashboardPortfolio /> 
          </Box>
        </GridItem>
        <GridItem area={'invest'}>
        <Heading as='h2' size='lg'>
          Invest
        </Heading>
        <Box pb={1}>
          <Link as={RouterLink} to='/invest'>
            <Text>View sleepers <ArrowForwardIcon /></Text>
          </Link>
        </Box>
        <Box boxShadow='base' rounded='md' bg='white' area={'invest'} p={3}>
          <Flex px={1} pb={2}>
            <Text>Sleeper:</Text>
            <Spacer/>
            <Text>Sleep Value:</Text>
          </Flex>
          <DashboardInvest />
        </Box>
        </GridItem>
      </Grid>
    </Container>
    
  )
}
export default Dashboard