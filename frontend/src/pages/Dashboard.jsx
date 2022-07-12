import { 
  Grid, 
  GridItem, 
  Container, 
  Box,
  Heading,
  Text,
  Link
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
        templateAreas={`"graph      graph"
                        "portfolio  invest"`}

        gridTemplateRows={'auto'}
        gridTemplateColumns={'auto'}
        gap='5'
        >
        <GridItem boxShadow='base' rounded='md' bg='white' area={'graph'}>
          <DashboardGraph />
        </GridItem>
        <GridItem area={'portfolio'}>
          <DashboardPortfolio />
        </GridItem>
        <GridItem area={'invest'}>
        <Heading as='h2' size='lg'>
          Invest
        </Heading>
        <Link as={RouterLink} to='/invest'>
          <Text>View sleepers <ArrowForwardIcon /></Text>
        </Link>
        <Box boxShadow='base' rounded='md' bg='white' area={'invest'} p={3}>
          <DashboardInvest />
        </Box>
        </GridItem>
      </Grid>
    </Container>
    
  )
}
export default Dashboard