
import { 
  Box,
  Heading,
  Text
} from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'
const DashboardInvest = () => {
  return (
    <div>
      <Heading size='lg'>
        Invest
      </Heading>
      <div>
        <Text>See more <span> <ArrowForwardIcon /> </span> </Text>
      </div>
      <Box boxShadow='base' rounded='md' bg='white' area={'portfolio'}>
        yo
      </Box>
    </div>
  )
}
export default DashboardInvest