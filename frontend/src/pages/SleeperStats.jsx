import {
  Container,
  Heading,
  Grid,
  GridItem,
} from '@chakra-ui/react'

import { useParams } from 'react-router-dom';
import SStatsGraph1 from '../components/SleeperStats/SStatsGraph1';
import SStatsGraph2 from '../components/SleeperStats/SStatsGraph2';
import SStatsStats from '../components/SleeperStats/SStatsStats';

const SleeperStats = () => {
  let { sleeperId } = useParams();

  return (
    <Container maxW={'5xl'} p={4}>
      <Heading as='h1' size='2xl'>
        {sleeperId}
      </Heading>
      
      <Grid
        templateAreas={{
          base: `'graph1' 
                 'graph2'
                 'stats'`,
          md: `'graph1 stats' 
               'graph2 stats'`
        }}
        gridTemplateRows={'auto'}
        gridTemplateColumns={'auto'}
        gap='3'
      >
        <GridItem area={'graph1'}>
          <Heading as='h2' size='md'>Sleep value</Heading>
          <SStatsGraph1/>
        </GridItem>
        <GridItem area={'graph2'}>
          <Heading as='h2' size='md'>Sleep hours</Heading>
          <SStatsGraph2/>
        </GridItem>
        <GridItem area={'stats'}>
          <SStatsStats/>
        </GridItem>
      </Grid>
      

    </Container>
  )
};

export default SleeperStats