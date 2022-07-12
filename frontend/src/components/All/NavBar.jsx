import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
  Heading,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';

import '@fontsource/catamaran/900.css'
import '@fontsource/open-sans/500.css'

import NavBarSignIn from './NavBar/NavBarSignIn';

const NavLink = (props) => (
  <Link
    px={3}
    py={2}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'white',
    }}
    to={`/${props.link}`}
    as={RouterLink}>
    {props.text}
  </Link>
);

const TitleLink = () => (
  <Link
    _hover={{
      textDecoration: 'none',
    }}
    to={`/`}
    as={RouterLink}>
    <Heading>sleeper</Heading>
  </Link>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg={'blue.300'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            bg={'white'}
            _hover={{ bg: 'gray.100' }}
            _expanded={{ bg: 'gray.100' }}
          />
          <HStack spacing={8} alignItems={'center'}>
            <TitleLink />
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              <NavLink link='sleeperlogs' text='Your Logs'/>
              <NavLink link='dashboard' text='Dashboard'/>
              <NavLink link='portfolio' text='Portfolio'/>
              <NavLink link='invest' text='Invest'/>
            </HStack>
          </HStack>
          <NavBarSignIn />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLink link='sleeperlogs' text='Your Logs'/>
              <NavLink link='dashboard' text='Dashboard'/>
              <NavLink link='portfolio' text='Portfolio'/>
              <NavLink link='invest' text='Invest'/>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}