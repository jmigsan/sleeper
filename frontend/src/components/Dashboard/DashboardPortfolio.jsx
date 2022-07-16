import { 
  Box,
  Heading,
  Text,
  Link,
  HStack,
  Stack,
  Flex,
  Spacer,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import firebaseApp from '../../firebaseInit';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import axios from 'axios';

const auth = getAuth(firebaseApp);

const DashboardPortfolio = () => {
  const [sleeperPortfolio, setSleeperPortfolio] = useState([]);
  const [user, loading, error] = useAuthState(auth);

  const getUserPortfolio = async () => {
    const LogData = {userUid: user.uid};
    const portfolioData = await axios.post('/api/getUserPortfolio', LogData);
    setSleeperPortfolio(portfolioData.data.slice(0, 3));
  };

  useEffect(() => {
    getUserPortfolio();
  }, [user])

  if (user) {
    return (
      <>
        {sleeperPortfolio.length > 0 ? (
          <Stack>
            {sleeperPortfolio.map(x => (
            <Box key={x.pick_sleeper_id}>
              <Link as={RouterLink} to={`/sleeper/${x.pick_sleeper_id}`}>
                <Box boxShadow='base' rounded='md' p={3}>
                  <Flex>
                    <Text>{x.sleeper_name}</Text>
                    <Spacer/>
                    <Text>{((x.pick_amount)).toFixed(2)}</Text>
                    <Spacer/>
                    <Text>{((x.sleep_value)*(x.pick_amount)).toFixed(2)} SP</Text>
                  </Flex>
                </Box>
              </Link>
            </Box>
            ))}
          </Stack>
        ) 
        : (<Box boxShadow='base' rounded='md' p={3}>
            <Text>There seems to be nothing here.</Text>
            <Text>Go find some investments!</Text>
          </Box>)}
      </>
    )
  };

  if (!user) {
    return (
      <Text>Log in to view your portfolio</Text>
    )
  };
};
export default DashboardPortfolio