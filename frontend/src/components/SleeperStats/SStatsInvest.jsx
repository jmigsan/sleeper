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
} from '@chakra-ui/react'

import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { useState } from "react";

const SStatsInvest = () => {
  const [buyAmount, setBuyAmount] = useState(3.0);
  const [sellAmount, setSellAmount] = useState();

  const investInSleeper = () => {
    console.log(buyAmount);
  };

  return (
    <Center pb={4}>
      <Stack>
        <Center>
          <Heading size={'lg'}>Invest</Heading>
        </Center>
        <HStack height={95}>
          <Stack>
            <NumberInput size='lg' maxW={40} defaultValue={0} min={0}>
              <NumberInputField type='number' onChange={(e) => setBuyAmount(e.target.value)} />
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
            <NumberInput size='lg' maxW={40} defaultValue={0} min={0}>
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