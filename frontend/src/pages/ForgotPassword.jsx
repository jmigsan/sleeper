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
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// firebase things
import firebaseApp from '../firebaseInit';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
const auth = getAuth(firebaseApp);

const ForgotPassword = () => {
  const [errorMsg, setErrorMsg] = useState('');

  // firebase things
  const [email, setEmail] = useState('');

  const navigate = useNavigate();
  const toast = useToast()

  const sendResetEmail = async () => {
    setErrorMsg('')
    try {
      const userCredential = await sendPasswordResetEmail(auth, email)
      toast({
        title: 'Password Reset Email Sent',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('/signin');
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

  return (
    <Flex
      align={'center'}
      justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Forgot your password?</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            We'll send you an email so you can reset it
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
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={ () => sendResetEmail() }>
                Send Password Reset Email
              </Button>
              <SignUpError />
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Remember your password? <Link as={RouterLink} to='/signin' color={'blue.400'}>Sign In</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default ForgotPassword;