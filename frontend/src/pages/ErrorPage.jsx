import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, blue.300, blue.500)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>

      <Link as={RouterLink} to='/'>
        <Button
          colorScheme="blue"
          bgGradient="linear(to-r, blue.300, blue.400, blue.500)"
          color="white"
          variant="solid">
          Go to Home
        </Button>
      </Link>
    </Box>
  );
}

export default ErrorPage;