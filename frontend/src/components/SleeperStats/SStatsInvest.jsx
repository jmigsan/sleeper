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
  Button,
  HStack,
  Center,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ButtonGroup,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Box,
  Divider,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import firebaseApp from '../../firebaseInit';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth(firebaseApp);

const SStatsInvest = ({ sleeperPortfolio, SLog3 }) => {
  const [user, loading, error] = useAuthState(auth);

  const [buyAmount, setBuyAmount] = useState('0');
  const [sellAmount, setSellAmount] = useState('0');
  const [buySellMsg, setBuySellMsg] = useState('');

  const {sleeperId} = useParams();

  const toast = useToast()

  const [userPortfolio, setUserPortfolio] = useState(0);
  const [userCash, setUserCash] = useState(0);
  const [log3LastPrice, setLog3LastPrice] = useState(0);

  const navigate = useNavigate();

  const investInSleeper = async () => {
    try {
      const LogData = {investorId: user.uid, investmentId: sleeperId, amount: buyAmount};
      const response = await axios.post('/api/investInSleeper', LogData);
      navigate('/dashboard');
      toast({
        title: 'Transaction Completed',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch(error) {
      toast({
        title: `${error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    };
  };

  const sellSleeper = async () => {
    try {
      const LogData = {investorId: user.uid, investmentId: sleeperId, amount: sellAmount};
      const response = await axios.post('/api/sellSleeper', LogData);
      navigate('/dashboard');
      toast({
        title: 'Transaction Completed',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    }
    catch(error) {
      toast({
        title: `${error}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    };
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
    setUserPortfolio(sleeperPortfolio);    
  }, [sleeperPortfolio])

  useEffect(() => {
    getCash();    
  }, [user])

  useEffect(() => {
    try {
      setLog3LastPrice(SLog3.lastPrice)
    }
    catch { 
    }
    
    // console.log(log3LastPrice)
  }, [SLog3]);
  

  try {
    if (user.uid === sleeperId) {
      return (
        <>
        </>
      )
    };
    if (user.uid !== sleeperId) {
      return (
        <Center pb={4}>
          <Stack>
            <Center>
              <Heading size={'lg'}>Invest</Heading>
            </Center>
            <HStack height={95}>
              <Stack>
                <NumberInput size='lg' maxW={40} defaultValue={0} min={0} value={buyAmount} max={userCash / log3LastPrice} precision={2} onChange={(e) => setBuyAmount(e)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button bg={'green.200'} rightIcon={<AddIcon />} onClick={() => {investInSleeper()}}>
                  Buy Shares
                </Button>
              </Stack>
              <Divider orientation='vertical' />
              <Stack>
                <NumberInput size='lg' maxW={40} defaultValue={0} min={0} max={userPortfolio[0].pick_amount} value={sellAmount} precision={2} onChange={(e) => setSellAmount(e)}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Button bg={'red.200'} rightIcon={<MinusIcon />} onClick={() => {sellSleeper()}}>
                  Sell Shares
                </Button>
              </Stack>
            </HStack>
            <Center pt={1}>
              <Stack>
                <Center>
                  <Text>Current Investment: {userPortfolio[0].pick_amount.toFixed(2)} shares</Text>
                </Center>
                <Center>
                  <Text>Cash Available: {userCash} SP</Text>
                </Center>
              </Stack>
            </Center>
          </Stack>
        </Center>
      )
    }
  }
  catch{

  }
}
export default SStatsInvest