import { 
  Box,
  Heading,
  Text,
  Link,
  HStack,
  Stack,
  Flex,
  Spacer,
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
    setSleeperPortfolio(portfolioData.data);
  };

  useEffect(() => {
    getUserPortfolio();
  }, [])

  if (user) {
    return (
      <>
        {sleeperPortfolio.length > 0 ? (
          <Stack>
            {sleeperPortfolio.map(x => (
            <div key={x.pick_sleeper_id}>
              <Link as={RouterLink} to={`/sleeper/${x.pick_sleeper_id}`}>
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
        : (<>
            <Text>There seems to be nothing here.</Text>
            <Text>Go find some investments!</Text>
          </>)}
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