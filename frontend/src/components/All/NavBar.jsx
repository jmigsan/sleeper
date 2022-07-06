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

import {
  HamburgerIcon,
  CloseIcon,
} from '@chakra-ui/icons';

import '@fontsource/catamaran/900.css'
import '@fontsource/open-sans/500.css'

const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => (
  <Link
    px={3}
    py={2}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: 'white',
    }}
    href={'#'}>
    {children}
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
            <Heading>sleeper</Heading>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
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
                <MenuItem>Sign in</MenuItem>
                <MenuDivider />
                <MenuItem>Sign up</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}