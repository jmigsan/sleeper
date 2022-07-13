import { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Heading,
} from '@chakra-ui/react'

const SStatsName = ({ sleeperId }) => {
  const [sleeperName, setSleeperName] = useState('Loading...');

  const getSleeperName = async () => {
    const LogData = {sleeperId: sleeperId};
    const response = await axios.post('/api/getSleeperName', LogData);
    setSleeperName(response.data[0].sleeper_name);
  };

  useEffect(() => {
    getSleeperName();
  }, [])
  

  return (
    <Heading as='h1' pt={3} pb={8} size='2xl'>
      {sleeperName}
    </Heading>
  )
}
export default SStatsName