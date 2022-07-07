import {
  Container,
  Heading,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

import { useParams } from 'react-router-dom';
import SStatsGraph1 from '../components/SleeperStats/SStatsGraph1';
import SStatsGraph2 from '../components/SleeperStats/SStatsGraph2';
import SStatsStats from '../components/SleeperStats/SStatsStats';

const SleeperStats = () => {
  let { sleeperId } = useParams();

  return (
    <Container maxW={'5xl'} p={4}>
      <Heading as='h1' pt={3} pb={8} size='2xl'>
        {sleeperId}
      </Heading>

      <StatGroup pb={6}>
        <Stat>
          <StatLabel>Sleep value</StatLabel>
          <StatNumber>114.35</StatNumber>
          <StatHelpText>
            <StatArrow type='increase' />
            10.2%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Hours slept</StatLabel>
          <StatNumber>6.3</StatNumber>
          <StatHelpText>
            <StatArrow type='decrease' />
            25.33%
          </StatHelpText>
        </Stat>
      </StatGroup>
      
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