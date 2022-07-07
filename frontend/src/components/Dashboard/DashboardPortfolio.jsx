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

const DashboardPortfolio = () => {
  return (
    <div>
      <Flex>
        <Heading as='h2' size='lg'>
          Portfolio
        </Heading>
        <Spacer/>
        <Link as={RouterLink} to='/portfolio'>
          <Text>See more <span> <ArrowForwardIcon /> </span> </Text>
        </Link>
      </Flex>
      <Box boxShadow='base' rounded='md' bg='white' area={'portfolio'}>
        yo
      </Box>
    </div>
  )
}
export default DashboardPortfolio