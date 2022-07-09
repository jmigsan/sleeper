import {
  Flex,
  Avatar,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
} from '@chakra-ui/react';

import { Link as RouterLink } from 'react-router-dom';

import firebaseApp from '../../../firebaseInit'
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
const auth = getAuth(firebaseApp);

const AccountLinks = (props) => (
  <Link
    _hover={{
      textDecoration: 'none',
    }}
    to={`/${props.link}`}
    as={RouterLink}>
    <MenuItem>{props.text}</MenuItem>
  </Link>
);

const SignOutFunction = () => {
  try {
    signOut(auth)
  }
  catch (err){
    console.log(err);
  }
};

const NavBarSignIn = () => {
  const [user, loading, error] = useAuthState(auth);
  if (!user) {
    return (
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
    )
  }

  if (user) {
    return (
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
            {user.email}
          </Text>
          <Avatar
              size={'sm'}
              src={''}
            />
          </HStack>
        </MenuButton>
          <MenuList>
            <MenuItem onClick={() => SignOutFunction() }>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    )
  }
}
export default NavBarSignIn
