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
} from '@chakra-ui/react'

import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { useState } from "react";

const SStatsInvest = () => {
  const [buySellToggle, setBuySellToggle] = useState('buy');

  return (
    <Center pb={4}>
      <Stack>
        <Center>
          <Heading size={'lg'}>Invest</Heading>
        </Center>
        <HStack height={95}>
          <Stack>
            <NumberInput size='lg' maxW={40} defaultValue={0}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button bg={'green.200'} rightIcon={<AddIcon />}>
              Buy
            </Button>
          </Stack>
          <Divider orientation='vertical' />
          <Stack>
            <NumberInput size='lg' maxW={40} defaultValue={0}>
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

        
        
        <HStack>
          
          
        </HStack>
      </Stack>
    </Center>
  )
}
export default SStatsInvest