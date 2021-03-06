import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Center,
  Link,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

const Landing = () => {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}>
          Stock market where you bet{' '}
          <Text as={'span'} color={'blue.400'}>
            if someone will sleep early or not
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Are they gonna sleep early? Are the gonna sleep late? Are they gonna do it consistently? Are they sleep deprived? 
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Link as={RouterLink} to='/dashboard' _hover={{ textDecoration: 'none' }}>
            <Button
              rounded={'full'}
              px={6}
              colorScheme={'blue'}
              bg={'blue.400'}
              _hover={{ bg: 'blue.500' }}>
              Get started
            </Button>
          </Link>
        </Stack>
        <Flex>
          <Center>
            <Image w={'xl'} src='https://images.unsplash.com/photo-1601230202587-1b3f0286c1b7' />
          </Center>
        </Flex>
      </Stack>
    </Container>
  );
};

export default Landing;