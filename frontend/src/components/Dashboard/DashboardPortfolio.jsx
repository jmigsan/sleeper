import { 
  Box,
  Heading,
  Text,
  Link
} from '@chakra-ui/react'

import { Link as RouterLink } from 'react-router-dom';

import { ArrowForwardIcon } from '@chakra-ui/icons'

const DashboardPortfolio = () => {
  return (
    <div>
      <Heading as='h2' size='lg'>
        Portfolio
      </Heading>
      <Link as={RouterLink} to='/portfolio'>
        <Text>See more <ArrowForwardIcon /></Text>
      </Link>
      <Box boxShadow='base' rounded='md' bg='white' area={'portfolio'}>
        yo
      </Box>
    </div>
  )
}
export default DashboardPortfolio