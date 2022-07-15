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

import axios from 'axios';
import { useState } from "react";
import { useParams } from 'react-router-dom';

import firebaseApp from '../../firebaseInit';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = getAuth(firebaseApp);

const SStatsInvest = () => {
  const [user, loading, error] = useAuthState(auth);

  const [buyAmount, setBuyAmount] = useState('0');
  const [sellAmount, setSellAmount] = useState('0');
  const [buySellMsg, setBuySellMsg] = useState('');

  const {sleeperId} = useParams();

  const toast = useToast()

  const investInSleeper = async () => {
    try {
      const LogData = {investorId: user.uid, investmentId: sleeperId, amount: buyAmount};
      const response = await axios.post('/api/investInSleeper', LogData);
      setBuySellMsg(response.data);
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

  return (
    <Center pb={4}>
      <Stack>
        <Center>
          <Heading size={'lg'}>Invest</Heading>
        </Center>
        <HStack height={95}>
          <Stack>
            <NumberInput size='lg' maxW={40} defaultValue={0} min={0} value={buyAmount} onChange={(e) => setBuyAmount(e)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button bg={'green.200'} rightIcon={<AddIcon />} onClick={() => {investInSleeper()}}>
              Buy
            </Button>
          </Stack>
          <Divider orientation='vertical' />
          <Stack>
            <NumberInput size='lg' maxW={40} defaultValue={0} min={0} value={sellAmount} onChange={(e) => setSellAmount(e)}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button bg={'red.200'} rightIcon={<MinusIcon />}>
              Sell
            </Button>
          </Stack>
        </HStack>
      </Stack>
    </Center>
  )
}
export default SStatsInvest