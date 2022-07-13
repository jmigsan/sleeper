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
} from '@chakra-ui/react'

import { AddIcon, MinusIcon } from '@chakra-ui/icons'

const SStatsInvest = () => {
  return (
    <Center pb={4}>
      <Stack>
        <Center>
          <Heading size={'lg'}>Invest</Heading>
        </Center>
        <HStack>
          <Button bg={'green.200'} rightIcon={<AddIcon />}>
            Buy
          </Button>
          <Button bg={'red.200'} rightIcon={<MinusIcon />}>
            Sell
          </Button>
        </HStack>
      </Stack>
    </Center>
  )
}
export default SStatsInvest