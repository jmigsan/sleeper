import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
  Text,
  Tooltip as ChakraTooltip,
} from '@chakra-ui/react';

import firebaseApp from '../../firebaseInit';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useEffect, useState } from "react";
import axios from 'axios';

const auth = getAuth(firebaseApp);


const data = [
  {
    date: '1/2/2022',
    cost: 30
  },
  {
    date: '2/2/2022',
    cost: 40
  },
  {
    date: '3/2/2022',
    cost: 20
  },
  {
    date: '4/2/2022',
    cost: 50
  },
  {
    date: '5/2/2022',
    cost: 55
  },
  {
    date: '6/2/2022',
    cost: 10
  },
];

const DashboardGraph = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userCash, setUserCash] = useState('.....');

  const getCash = async () => {
    if (user) {
      const LogData = {userUid: user.uid};
      const response = await axios.post('/api/getUserCash', LogData);
      const sleeperCash = await response.data[0].sleeper_cash_on_hand;
      setUserCash(sleeperCash.toLocaleString());
    };
  };

  useEffect(() => {
    getCash();
  }, [])
  

  if (user) {
    return (
      <>
        <Box p={5}>
          <Heading as='h2' size='xl'>Balance</Heading>
          <Box>
            <Text fontSize={'2xl'} as={'span'} onMouseOver={() => {if (userCash === '.....') {getCash()}}}>{userCash} </Text>
            <ChakraTooltip label="Sleep Bucks" aria-label='Sleep Bucks'>
              <Text fontSize={'2xl'} as={'span'}>SB</Text>
            </ChakraTooltip>

          </Box>
        </Box>
        <ResponsiveContainer width={'99%'} height={250}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="9 9" />
            <XAxis dataKey='date' />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#63b3ed"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </>
    );
  };

  if (!user) {
    return (
      <>
        <Heading p={4}>Log in to see your stats</Heading>
      </>
    );
  };

  
}

export default DashboardGraph
