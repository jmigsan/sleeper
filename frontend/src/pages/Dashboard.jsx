import { 
  Grid, 
  GridItem, 
  Container, 
} from '@chakra-ui/react';

import DashboardGraph from '../components/Dashboard/DashboardGraph';
import DashboardPortfolio from '../components/Dashboard/DashboardPortfolio';
import DashboardInvest from '../components/Dashboard/DashboardInvest';

const Dashboard = () => {
  return (
    <Container maxW={'5xl'} p={3}>
      <Grid
        templateAreas={`"graph      graph"
                        "portfolio  invest"`}

        gridTemplateRows={'auto'}
        gridTemplateColumns={'auto'}
        gap='1'
      >
        <GridItem boxShadow='base'  rounded='md' bg='white' area={'graph'}>
          <DashboardGraph />
        </GridItem>
        <GridItem boxShadow='base' rounded='md' bg='white' area={'portfolio'}>
          <DashboardPortfolio />
        </GridItem>
        <GridItem boxShadow='base' rounded='md' bg='white' area={'invest'}>
        <DashboardInvest />
        </GridItem>
      </Grid>
    </Container>
    
  )
}
export default Dashboard