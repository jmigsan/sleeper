import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart, 
  Pie, 
  Sector, 
  Cell,
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
  HStack,
  Flex,
} from '@chakra-ui/react';

import firebaseApp from '../../firebaseInit';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useEffect, useState } from "react";
import axios from 'axios';

const auth = getAuth(firebaseApp);

const DashboardGraph = () => {
  const [user, loading, error] = useAuthState(auth);
  const [userCash, setUserCash] = useState('.....');
  const [sleeperPortfolio, setSleeperPortfolio] = useState([]);
  const [sleeperPortfolioVal, setSleeperPortfolioVal] = useState(0);

  const getUserPortfolio = async () => {
    const LogData = {userUid: user.uid};
    const portfolioData = await axios.post('/api/getUserPortfolio', LogData);

    let updatedSLog1 = [];
    portfolioData.data.forEach((x) => {
      const investmentAmount = parseFloat((x.sleep_value * x.pick_amount).toFixed(2));
      const logData = {
        'Sleeper': x.sleeper_name,
        'Investment': investmentAmount
      }
      updatedSLog1.push(logData);
    });
    setSleeperPortfolio(updatedSLog1);
    // console.log(updatedSLog1);

    let portfolioVal = 0;
    portfolioData.data.forEach((x) => {
      const investmentAmount = x.sleep_value * x.pick_amount;
      portfolioVal = portfolioVal + investmentAmount;
    });
    setSleeperPortfolioVal(parseFloat(portfolioVal).toFixed(2));
  };

  const getCash = async () => {
    if (user) {
      const LogData = {userUid: user.uid};
      const response = await axios.post('/api/getUserCash', LogData);
      const sleeperCash = await response.data[0].sleeper_cash_on_hand;
      setUserCash(parseFloat(sleeperCash).toFixed(2));
    };
  };

  useEffect(() => {
    getCash();
    getUserPortfolio();
  }, [user])
  

  if (user) {
    return (
      <>
        <Flex>
          <Box p={5}>
            <Heading as='h3' size='md'>Total Portfolio</Heading>
            <Text fontSize={'2xl'} as={'span'} onMouseOver={() => {if (userCash === '.....') {getCash()}}}>{(parseFloat(Math.abs(userCash)) + parseFloat(sleeperPortfolioVal)).toLocaleString()} </Text>
            <ChakraTooltip label="Sleep Bucks" aria-label='Sleep Bucks' closeOnClick={false}>
              <Text fontSize={'2xl'} as={'span'}>SB</Text>
            </ChakraTooltip>

            <Heading as='h3' size='md' pt={2}>Cash Value</Heading>
            <Text fontSize={'2xl'} as={'span'} onMouseOver={() => {if (userCash === '.....') {getCash()}}}>{(parseFloat(Math.abs(userCash))).toLocaleString()} </Text>
            <ChakraTooltip label="Sleep Bucks" aria-label='Sleep Bucks' closeOnClick={false}>
              <Text fontSize={'2xl'} as={'span'}>SB</Text>
            </ChakraTooltip>

            <Heading as='h3' size='md' pt={2}>Portfolio Value</Heading>
            <Text fontSize={'2xl'} as={'span'} onMouseOver={() => {if (userCash === '.....') {getCash()}}}>{(parseFloat(Math.abs(sleeperPortfolioVal))).toLocaleString()} </Text>
            <ChakraTooltip label="Sleep Bucks" aria-label='Sleep Bucks' closeOnClick={false}>
              <Text fontSize={'2xl'} as={'span'}>SB</Text>
            </ChakraTooltip>
          </Box>
          <ResponsiveContainer width={'50%'} height={250}>
            <PieChart>
              <Tooltip/>
              <Pie data={sleeperPortfolio} dataKey="Investment" nameKey="Sleeper" cx="50%" cy="50%" fill="#63b3ed"/>
            </PieChart>
          </ResponsiveContainer>
        </Flex>
      </>
    );
  };

  if (!user) {
    return (
      <>
        <Heading p={4}>Log in to see your statistics</Heading>
      </>
    );
  };

  
}

export default DashboardGraph
