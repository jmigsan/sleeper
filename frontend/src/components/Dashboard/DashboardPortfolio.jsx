import { 
  Box,
  Heading,
  Text
} from '@chakra-ui/react'

import { ArrowForwardIcon } from '@chakra-ui/icons'

const DashboardPortfolio = () => {
  return (
    <div>
      <Heading as='h2' size='lg'>
        Portfolio
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
export default DashboardPortfolio