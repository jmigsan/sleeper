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
        <DashboardInvest />
        </GridItem>
      </Grid>
    </Container>
    
  )
}
export default Dashboard