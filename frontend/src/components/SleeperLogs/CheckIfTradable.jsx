import {
  Text,
  Button,
} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import firebaseApp from '../../firebaseInit';
import { getAuth } from 'firebase/auth';
const auth = getAuth(firebaseApp);

const CheckIfTradable = () => {
  const [ifPublic, setIfPublic] = useState(true);

  const getPublicStatus = async () => {
    const userUid = auth.currentUser.uid;
    const LogData = { userUid }
  
    const response = await axios.post('/api/getIfUserPublic', LogData);
    const ifPublic = await response.data[0].publicly_tradable;
    setIfPublic(ifPublic);
  };

  const togglePublicStatus = async () => {
    const userUid = auth.currentUser.uid;  

    if (ifPublic === true) {
      const newPublicSetting = false;
      const LogData = { userUid, newPublicSetting };

      try {
        let currentUserToken = await auth.currentUser.getIdToken(true);
        let idToken = currentUserToken;

        const config = {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        };

        const response = await axios.post('/api/changeIfUserPublic', LogData, config);
        const ifPublic = await response.data[0].publicly_tradable;
        setIfPublic(ifPublic);
      }
      catch (error) {
        console.log(error);
      };
      
    };

    if (ifPublic === false) {
      const newPublicSetting = true;
      const LogData = { userUid, newPublicSetting };

      try {
        let currentUserToken = await auth.currentUser.getIdToken(true);
        let idToken = currentUserToken;

        const config = {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        };

        const response = await axios.post('/api/changeIfUserPublic', LogData, config);
        const ifPublic = await response.data[0].publicly_tradable;
        setIfPublic(ifPublic);
      }
      catch (error) {
        console.log(error);
      };
      
    };
  };

  useEffect(() => {
    getPublicStatus();
  }, [])

  if (ifPublic === true) {
    return (
      <>
        <Text pb={2}>You are <Text color={'green.400'} as={'span'}> listed </Text> as a publicly tradable sleeper.</Text>
        <Button _hover={{bg:'red.200'}} size={'sm'} onClick={togglePublicStatus}>Click to be delisted</Button>
      </>
    )
  };
  if (ifPublic === false) {
    return (
      <>
        <Text pb={2}>You are <Text color={'red.400'} as={'span'}> not listed </Text> as a publicly tradable sleeper.</Text>
        <Button _hover={{bg:'green.200'}} size={'sm'} onClick={togglePublicStatus}>Click to be listed</Button>
      </>
    )
  };
}
export default CheckIfTradable