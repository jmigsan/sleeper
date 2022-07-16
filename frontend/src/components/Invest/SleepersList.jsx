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
  Tooltip as ChakraTooltip,
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
        <Box key={x.sleeper_id}>
          <Link as={RouterLink} to={`/sleeper/${x.sleeper_id}`}>
            <Box boxShadow='base' rounded='md' p={3}>
              <Flex>
                <Text>{x.sleeper_name}</Text>
                <Spacer/>
                <HStack>
                  <Text>{x.sleep_value}</Text>
                  <ChakraTooltip label="Sleep Bucks" aria-label='Sleep Bucks' closeOnClick={false}>
                    <Text>SB</Text>
                  </ChakraTooltip>
                </HStack>
              </Flex>
            </Box>
          </Link>
        </Box>
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

