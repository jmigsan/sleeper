import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Heading,
  Text,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';

import '@fontsource/catamaran/900.css'
import '@fontsource/open-sans/500.css'

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

const AccountLinks = (props) => (
  <Link
    _hover={{
      textDecoration: 'none',
    }}
    to={`/${props.link}`}
    as={RouterLink}>

    <MenuItem>
      {props.text}
    </MenuItem>
    
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
              <NavLink link='dashboard' text='Dashboard'>Dashboard</NavLink>
              <NavLink link='portfolio' text='Portfolio'>Portfolio</NavLink>
              <NavLink link='invest' text='Invest'>Invest</NavLink>
              
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
            <MenuButton 
              as={Button}
              bg={'white'}
              _hover={{ bg: 'gray.100' }}
              _expanded={{ bg: 'gray.100' }}
              >
            <HStack spacing='3' py='1'>
              <Text>
                Sign In
              </Text>
              <Avatar
                  size={'sm'}
                  src={''}
                />
              </HStack>
            </MenuButton>
              <MenuList>
                <AccountLinks text='Sign In' link='signin' />
                <MenuDivider />
                <AccountLinks text='Sign Up' link='signup' />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <NavLink link='dashboard' text='Dashboard'>Dashboard</NavLink>
              <NavLink link='portfolio' text='Portfolio'>Portfolio</NavLink>
              <NavLink link='invest' text='Invest'>Invest</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}