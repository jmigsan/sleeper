import { 
  Container,
  Heading,
  Box,
  Text,
  Link,
  HStack,
  Stack,
  Flex,
  Spacer,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import firebaseApp from '../firebaseInit';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import axios from 'axios';

const auth = getAuth(firebaseApp);

const Portfolio = () => {
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

  return (
    <Container maxW={'5xl'} p={4}>
      <Heading as='h1' py={3} size='2xl'>
        Portfolio
      </Heading>
      <Flex px={1} pb={2}>
        <Text>Sleeper:</Text>
        <Spacer/>
        <Text>Shares:</Text>
        <Spacer/>
        <Text>Investment:</Text>
        <Spacer/>
        <Text>Sleep Value:</Text>
      </Flex>
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
                  <Spacer/>
                  <Text>{x.sleep_value.toFixed(2)} SP</Text>
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
    </Container>
  )
}
export default Portfolio