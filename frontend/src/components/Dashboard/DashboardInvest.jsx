import { 
  Box,
  Heading,
  Text,
  Link
} from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom';

import { ArrowForwardIcon } from '@chakra-ui/icons'

const DashboardInvest = () => {
  return (
    <div>
      <Heading as='h2' size='lg'>
        Invest
      </Heading>
      <Link as={RouterLink} to='/invest'>
        <Text>See more <ArrowForwardIcon /></Text>
      </Link>
      <Box boxShadow='base' rounded='md' bg='white' area={'invest'}>
        yo
      </Box>
    </div>
  )
}
export default DashboardInvest