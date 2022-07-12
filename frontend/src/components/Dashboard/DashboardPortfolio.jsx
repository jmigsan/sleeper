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
    <>
      <Heading as='h2' size='lg'>
        Portfolio
      </Heading>
      <Link as={RouterLink} to='/portfolio'>
        <Text>View portfolio <ArrowForwardIcon /></Text>
      </Link>
      <Box boxShadow='base' rounded='md' bg='white' area={'portfolio'}>
        yo
      </Box>
    </>
  )
}
export default DashboardPortfolio