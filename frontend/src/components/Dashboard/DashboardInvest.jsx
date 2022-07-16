import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  HStack,
  Text,
  Box,
  Link,
  Stack,
  Skeleton,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const DashboardInvest = () => {
  const [sleepers, setSleepers] = useState([])

  const getPublicSleepers = async () => {
    const sleeperData = await axios.get('/api/getPublicSleepersInfo');
    setSleepers(sleeperData.data.slice(0, 3));
  };

  useEffect(() => {
    getPublicSleepers();
  }, [])
  
  return (
    <>
      {sleepers.length > 0 ? (
        <Stack>
          {sleepers.map(x => (
          <Box key={x.sleeper_id}>
            <Link as={RouterLink} to={`/sleeper/${x.sleeper_id}`}>
              <Box boxShadow='base' rounded='md' p={3}>
                <Flex>
                  <Text>{x.sleeper_name}</Text>
                  <Spacer/>
                  <Text>{x.sleep_value} SB</Text>
                </Flex>
              </Box>
            </Link>
          </Box>
          ))}
        </Stack>
      ) 
      : (<Stack>
          <Skeleton height='20px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' />
        </Stack>)}
    </>
  )
}
export default DashboardInvest