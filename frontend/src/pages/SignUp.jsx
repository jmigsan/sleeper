import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import axios from 'axios';

import { Link as RouterLink } from 'react-router-dom';

// firebase things
import firebaseApp from '../firebaseInit';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
const auth = getAuth(firebaseApp);

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // firebase things
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const initialiseSleeper = async (userUid, displayName) => {
    try {
      const LogData = { userUid: userUid, displayName: displayName }
      const response = await axios.post('/api/initSleeper', LogData);
    }
    catch(error) {
      console.log(error);
    };
  }

  const createSleeperUser = async () => {
    if (displayName.trim() === '') {
      setErrorMsg('Please enter a display name')
      return;
    };

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = await userCredential.user;
      //console.log(user.uid);
      //createEmptySleeperLog();
      initialiseSleeper(user.uid, displayName);
    }
    catch (err) {
      const errorMessage = err.message;
      setErrorMsg(errorMessage.slice(10))
    }
  };

  const SignUpError = () => {
    if (errorMsg !== '') {
      return (
        <Text color='red'>{errorMsg}</Text>
      );
    } else {
      return (
        <>
        </>
      );
    }
  }

  if (user) {
    return (
      <Text>You are already signed in!</Text>
    )
  };

  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign Up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to invest in some sleepers 🛌😴🤑
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'base'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="displayname" isRequired>
              <FormLabel>Display Name</FormLabel>
              <Input 
                type="text" 
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
                <Text fontSize='sm' color={'gray.600'}>The email doesn't have to be real. <br/> We'll accept puppy@enjoyer.com. You won't be able to recover your password, however.</Text>
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={() => 
                  createSleeperUser()
                }>
                Sign up
              </Button>
              <SignUpError />
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link as={RouterLink} to='/signin' color={'blue.400'}>Sign In</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUp

