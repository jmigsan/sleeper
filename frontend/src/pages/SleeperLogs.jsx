import {
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  Box,
  Button,
  Skeleton,
  Stack,
  Switch,
  HStack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";

import SubmitSleepLogBtn from '../components/SleeperLogs/SubmitSleepLogBtn';
import CheckIfTradable from '../components/SleeperLogs/CheckIfTradable';

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

  const [SLog1, setSLog1] = useState();
  const [SLog2, setSLog2] = useState();

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

      const resData = await response.data;

      const updatedSLog1 = [];
      resData.forEach((x) => {
        const logData = {
          'Date': x.log_date,
          'Sleep Value': x.sleep_value
        }
        updatedSLog1.push(logData);
      });
      setSLog1(updatedSLog1);

      const updatedSLog2 = [];
      resData.forEach((x) => {
        const hours_slept = (x.minutes_slept) / 60;

        const logData = {
          'Date': x.log_date,
          'Hours Slept': hours_slept
        }
        updatedSLog2.push(logData);
      });
      setSLog2(updatedSLog2);

    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getLogs();
  }, [])

  const now = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[now.getMonth()];
  const nowDate = `${now.getDate()} ${month} ${now.getFullYear()}`; //10 Jul 2022

  let lastDate = 'loading';
  try {
    lastDate = SLog1[SLog1.length - 1].Date;
  }
  catch {
    lastDate = 'loading';
  };
  
  if (lastDate === 'loading') {
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
            <Stack>
              <Skeleton height='29px'>
                <Text>What time did you sleep last night (Note: 24 Hour Clock)</Text>
              </Skeleton>
              <Skeleton height='29px' />
              <Skeleton height='29px' />
              <Skeleton height='29px' />
              <Skeleton height='29px' />
              <Skeleton height='29px' />
            </Stack>
            </Box>
          </GridItem>
          <GridItem area={'sleep_graph'}>
            <Heading as='h3' size='md' pb={3}>Sleep Value</Heading>
            <ResponsiveContainer width={'99%'} height={250}>
              <LineChart
                data={SLog1}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="9 9" />
                <XAxis dataKey='Date' />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Sleep Value"
                  stroke="#63b3ed"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            {/* <Button onClick={ () => getLogs() }>update</Button> */}
          </GridItem>
          <GridItem area={'sleep_hours'}>
            <Heading as='h3' size='md' pb={3}>Sleep Hours</Heading>
            <ResponsiveContainer width={'99%'} height={250}>
              <BarChart
                width={500}
                height={300}
                data={SLog2}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="9 9" />
                <XAxis dataKey='Date' />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Hours Slept" fill="#63b3ed" />
              </BarChart>
            </ResponsiveContainer>
          </GridItem>
        </Grid>
      </Container>
    )
  }
  if (lastDate !== nowDate) {
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
              <SubmitSleepLogBtn sleepyTime={sleepyTime} wakeyTime={wakeyTime} postFunc={getLogs}/>
            </Box>
          </GridItem>
          <GridItem area={'sleep_graph'}>
            <Heading as='h3' size='md' pb={3}>Sleep Value</Heading>
            <ResponsiveContainer width={'99%'} height={250}>
              <LineChart
                data={SLog1}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="9 9" />
                <XAxis dataKey='Date' />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Sleep Value"
                  stroke="#63b3ed"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            {/* <Button onClick={ () => getLogs() }>update</Button> */}
          </GridItem>
          <GridItem area={'sleep_hours'}>
            <Heading as='h3' size='md' pb={3}>Sleep Hours</Heading>
            <ResponsiveContainer width={'99%'} height={250}>
              <BarChart
                width={500}
                height={300}
                data={SLog2}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="9 9" />
                <XAxis dataKey='Date' />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Hours Slept" fill="#63b3ed" />
              </BarChart>
            </ResponsiveContainer>
          </GridItem>
        </Grid>
      </Container>
    )
  }
  if (lastDate === nowDate) {
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
            <Stack>
              <Box boxShadow='base' rounded='md' p={3}>
                <Heading as='h2' size='lg'>You've already logged today.</Heading>
              </Box>
              <Box boxShadow='base' rounded='md' p={3}>
                <CheckIfTradable />
              </Box>
            </Stack>
          </GridItem>
          <GridItem area={'sleep_graph'}>
            <Heading as='h3' size='md' pb={3}>Sleep Value</Heading>
            <ResponsiveContainer width={'99%'} height={250}>
              <LineChart
                data={SLog1}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5
                }}
              >
                <CartesianGrid strokeDasharray="9 9" />
                <XAxis dataKey='Date' />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="Sleep Value"
                  stroke="#63b3ed"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            {/* <Button onClick={ () => getLogs() }>update</Button> */}
          </GridItem>
          <GridItem area={'sleep_hours'}>
            <Heading as='h3' size='md' pb={3}>Sleep Hours</Heading>
            <ResponsiveContainer width={'99%'} height={250}>
              <BarChart
                width={500}
                height={300}
                data={SLog2}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="9 9" />
                <XAxis dataKey='Date' />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Hours Slept" fill="#63b3ed" />
              </BarChart>
            </ResponsiveContainer>
          </GridItem>
        </Grid>
      </Container>
    )
  }

  
};

export default Portfolio