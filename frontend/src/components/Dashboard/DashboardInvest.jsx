
import { 
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Spacer
} from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom';

import { ArrowForwardIcon } from '@chakra-ui/icons'
const DashboardInvest = () => {
  return (
    <div>
      <Flex>
        <Heading as='h2' size='lg'>
          Invest
        </Heading>
        <Spacer/>
        <Link as={RouterLink} to='/invest'>
          <Text>See more <span> <ArrowForwardIcon /> </span> </Text>
        </Link>
      </Flex>
      <Box boxShadow='base' rounded='md' bg='white' area={'portfolio'}>
        yo
      </Box>
    </div>
  )
}
export default DashboardInvest