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

const SleepersList = () => {
  const [sleepers, setSleepers] = useState([])

  const getPublicSleepers = async () => {
    const sleeperData = await axios.get('/api/getPublicSleepersInfo');
    setSleepers(sleeperData.data);
  };

  useEffect(() => {
    getPublicSleepers();
  }, [])

  return (
    <>
    {sleepers.length > 0 ? (
      <Stack>
        {sleepers.map(x => (
        <div key={x.sleeper_id}>
          <Link as={RouterLink} to={`/sleeper/${x.sleeper_id}`}>
            <Box boxShadow='base' rounded='md' p={3}>
              <Flex>
                <Text>{x.sleeper_name}</Text>
                <Spacer/>
                <Text>{x.sleep_value}</Text>
              </Flex>
            </Box>
          </Link>
        </div>
        ))}
      </Stack>
    ) 
    : (<Stack>
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
      </Stack>)}
    </>
  )
}
export default SleepersList

