import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// firebase things
import firebaseApp from '../firebaseInit';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';
const auth = getAuth(firebaseApp);

const SignIn = () => {
  const [errorMsg, setErrorMsg] = useState('');

  // firebase things
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const signinSleeperUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = await userCredential.user
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
  };

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
          <Heading fontSize={'4xl'}>Sign In</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={'white'}
          boxShadow={'base'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input 
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Link color={'blue.400'}>Forgot password?</Link>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={ () => signinSleeperUser() }>
                Sign in
              </Button>
              <SignUpError />
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Don't have an account? <Link as={RouterLink} to='/signup' color={'blue.400'}>Sign Up</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignIn;