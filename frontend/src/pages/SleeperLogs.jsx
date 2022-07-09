import {
  Container,
  Heading,
  Button,
  Text,
  Grid,
  GridItem,
  Box,
} from '@chakra-ui/react'
import { useState } from 'react';
import TimePicker from 'react-time-picker';

import SLogsGraph1 from '../components/SleeperLogs/SLogsGraph1';
import SLogsGraph2 from '../components/SleeperLogs/SLogsGraph2';

//firebase things
import firebaseApp from '../firebaseInit'
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
const auth = getAuth(firebaseApp);

const submitSleepLog = (sleepyTime, wakeyTime) => {
  console.log(`${sleepyTime} ${wakeyTime}`);
  console.log(sleepyTime);
  console.log(wakeyTime);
};

const Portfolio = () => {
  //firebase
  const [user, loading, error] = useAuthState(auth);

  const [sleepyTime, setSleepyTime] = useState('21:00');
  const [wakeyTime, setWakeyTime] = useState('07:00');

  return (
    <Container maxW={'5xl'} p={4}>
      <Heading as='h1' pt={3} size='2xl' pb={8}>
        {user.email}'s Sleep Logs
      </Heading>

      <Grid
        templateAreas={{base:`'sleep_ask' 
                              'sleep_graph'
                              'sleep_hours'`,

                        md: `"sleep_ask sleep_graph" 
                             "sleep_ask sleep_hours"`}}

        gridTemplateRows={'auto'}
        gridTemplateColumns={'auto'}
        gap='5'
        >
        <GridItem area={'sleep_ask'}>
          <Box boxShadow='base' rounded='md' p={3}>
            <Heading as='h2' size='lg' pb={3}>Last night's statistics</Heading>
            <Box pb={3}>
              <Text>What time did you sleep last night (Note: 24 Hour Clock)</Text>
              <TimePicker onChange={setSleepyTime} value={sleepyTime} />
            </Box>
            <Box pb={3}>
              <Text>What time did you wake up today? (Note: 24 Hour Clock)</Text>
              <TimePicker onChange={setWakeyTime} value={wakeyTime} />
            </Box>
            <Button onClick={ () => submitSleepLog(sleepyTime, wakeyTime) }>Submit Log</Button>
          </Box>
        </GridItem>
        <GridItem area={'sleep_graph'}>
          <Heading as='h3' size='md' pb={3}>Sleep Value</Heading>
          <SLogsGraph1/>
        </GridItem>
        <GridItem area={'sleep_hours'}>
          <Heading as='h3' size='md' pb={3}>Sleep Hours</Heading>
          <SLogsGraph2/>
        </GridItem>
      </Grid>
    </Container>
  )
};

export default Portfolio