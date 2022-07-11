import {
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Box,
  Button,
} from '@chakra-ui/react'
import { useState } from 'react';
import TimePicker from 'react-time-picker';

import SLogsGraph1 from '../components/SleeperLogs/SLogsGraph1';
import SLogsGraph2 from '../components/SleeperLogs/SLogsGraph2';
import SubmitSleepLogBtn from '../components/SleeperLogs/SubmitSleepLogBtn';

import axios from 'axios';

//firebase things
import firebaseApp from '../firebaseInit'
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth(firebaseApp);

const Portfolio = () => {
  //firebase
  const [user, loading, error] = useAuthState(auth);

  const [sleepyTime, setSleepyTime] = useState('21:00');
  const [wakeyTime, setWakeyTime] = useState('07:00');

  const [yourSleepLogs, setYourSleepLogs] = useState([
    {
      timestamp: '1/2/2022',
      sleepvalue: 30
    },
    {
      timestamp: '1/2/2022',
      sleepvalue: 40
    },
    {
      timestamp: '1/2/2022',
      sleepvalue: 20
    },
    {
      timestamp: '1/2/2022',
      sleepvalue: 50
    },
    {
      timestamp: '1/2/2022',
      sleepvalue: 55
    },
    {
      timestamp: '2/2/2022',
      sleepvalue: 10
    },
  ]);

  const getLogs = async () => {
    try {
      let currentUserToken = await auth.currentUser.getIdToken(true);
      let idToken = currentUserToken;

      const config = {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      };

      const userUid = user.uid;
      const LogData = { userUid }

      const response = await axios.post('/api/getSleepLogs', LogData, config);
      // console.log(response.data);
      
      const yourLogs = response.data
      // console.log(yourLogs);

      const newLogData = [];

      yourLogs.forEach((x) => {
        const timestampOG = x.log_timestamp;
        const timestamp = timestampOG.substring(0, 10);

        console.log(timestamp);

        const sleepvalue = x.sleep_value;

        const newLogObject = { timestamp, sleepvalue };

        // newLogData.unshift(newLogObject);
      });

      // setYourSleepLogs(newLogData);

    } catch (error) {
      console.log(error);
    };
  };

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
              <TimePicker onChange={setSleepyTime} value={sleepyTime} clockIcon={null} required={true} format={'HH:mm'}/>
            </Box>
            <Box pb={3}>
              <Text>What time did you wake up today? (Note: 24 Hour Clock)</Text>
              <TimePicker onChange={setWakeyTime} value={wakeyTime} clockIcon={null} required={true} format={'HH:mm'}/>
            </Box>
            <SubmitSleepLogBtn sleepyTime={sleepyTime} wakeyTime={wakeyTime}/>
          </Box>
        </GridItem>
        <GridItem area={'sleep_graph'}>
          <Heading as='h3' size='md' pb={3}>Sleep Value</Heading>
          <SLogsGraph1 sleepLogs={'yourSleepLogs'}/>
          <Button onClick={ () => getLogs() }>yo</Button>
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