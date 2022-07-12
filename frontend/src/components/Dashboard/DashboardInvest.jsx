import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  HStack,
  Text,
  Box,
  Link,
  Stack,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';

const DashboardInvest = () => {
  const [sleepers, setSleepers] = useState([])

  const getPublicSleepers = async () => {
    const sleeperData = await axios.get('/api/getPublicSleepers');

    let publicSleepers = [];
    
    sleeperData.data.forEach(async (x) => {
      // console.log(x.sleeper_id)
      const postData = {userUid: x.sleeper_id}
      const sleeperValue = await axios.post('/api/getLastSleeperValue', postData);
      // console.log({sleeper_name: x.sleeper_name, sleeper_sv: sleeperValue.data[0].sleep_value });
      publicSleepers.push({sleeper_name: x.sleeper_name, sleeper_sv: sleeperValue.data[0].sleep_value, sleeper_id: x.sleeper_id })
    });

    setSleepers(publicSleepers);
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
                <HStack>
                  <Text>{x.sleeper_name}</Text>
                  <Text>{x.sleeper_sv}</Text>
                </HStack>
              </Box>
            </Link>
          </div>
          ))}
        </Stack>
      ) 
      : (<Text>No Sleepers Available</Text>)}
    </>
  )
}
export default DashboardInvest