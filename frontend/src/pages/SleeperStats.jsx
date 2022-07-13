import {
  Container,
  Heading,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Button,
  HStack,
} from '@chakra-ui/react'

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import SStatsGraph1 from '../components/SleeperStats/SStatsGraph1';
import SStatsGraph2 from '../components/SleeperStats/SStatsGraph2';
import SStatsName from '../components/SleeperStats/SStatsName';
import SStatsStatGroup from '../components/SleeperStats/SStatsStatGroup';
// import SStatsStats from '../components/SleeperStats/SStatsStats';
import SStatsGraph3 from '../components/SleeperStats/SStatsGraph3';

const SleeperStats = () => {
  let { sleeperId } = useParams();

  const [SLog1, setSLog1] = useState();
  const [SLog2, setSLog2] = useState();
  const [SLog3, setSLog3] = useState();
  const [SLog4, setSLog4] = useState();

  const getLogs = async () => {
    try {
      const LogData = { userUid: sleeperId }

      const response = await axios.post('/api/getSleepLogs', LogData);
      const resData = await response.data;

      let updatedSLog1 = [];
      resData.forEach((x) => {
        const logData = {
          'Date': x.log_date,
          'Sleep Value': x.sleep_value
        }
        updatedSLog1.push(logData);
      });
      setSLog1(updatedSLog1);

      let updatedSLog2 = [];
      resData.forEach((x) => {
        const hours_slept = (x.minutes_slept) / 60;

        const logData = {
          'Date': x.log_date,
          'Hours Slept': hours_slept
        }
        updatedSLog2.push(logData);
      });
      setSLog2(updatedSLog2);

      let updatedSLog3 = {};
      const lastPrice = resData.slice(-1)[0].sleep_value;
      const lastMinsSlept = resData.slice(-1)[0].minutes_slept;
      let secondLastPrice = 0;
      let secondLastMinsSlept = 0;
      try {
        secondLastPrice = resData.slice(-2, -1)[0].sleep_value;
        secondLastMinsSlept = resData.slice(-2, -1)[0].minutes_slept;
      } 
      catch {
        secondLastPrice = resData.slice(-1)[0].sleep_value;
        secondLastMinsSlept = resData.slice(-1)[0].minutes_slept;
      }
      let svArrowUpDown = '';
      let hsArrowUpDown = '';
      let svHowUpDown = 0;
      let hsHowUpDown = 0;

      if (lastPrice < secondLastPrice) {
        svArrowUpDown = 'decrease';
        svHowUpDown =  100 * Math.abs( (lastPrice - secondLastPrice) / ( (lastPrice + secondLastPrice)/2 ) );
      };

      if (lastPrice >= secondLastPrice) {
        svArrowUpDown = 'increase';
        svHowUpDown =  100 * Math.abs( (lastPrice - secondLastPrice) / ( (lastPrice + secondLastPrice)/2 ) );
      };

      if (lastMinsSlept < secondLastMinsSlept) {
        hsArrowUpDown = 'decrease';
        hsHowUpDown =  100 * Math.abs( (lastMinsSlept - secondLastMinsSlept) / ( (lastMinsSlept + secondLastMinsSlept)/2 ) );
      };

      if (lastMinsSlept >= secondLastMinsSlept) {
        hsArrowUpDown = 'increase';
        hsHowUpDown =  100 * Math.abs( (lastMinsSlept - secondLastMinsSlept) / ( (lastMinsSlept + secondLastMinsSlept)/2 ) );
      };

      updatedSLog3 = {
        lastPrice,
        lastMinsSlept,
        svArrowUpDown,
        hsArrowUpDown,
        svHowUpDown,
        hsHowUpDown,
      }
      setSLog3(updatedSLog3);

      let updatedSLog4 = [];
      resData.forEach((x) => {
        const logData = {
          'Date': x.log_date,
          'Sleep Times': x.sleep_times
        }
        updatedSLog4.push(logData);
      });
      setSLog4(updatedSLog4);

    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    getLogs();
  }, [])

  return (
    <Container maxW={'5xl'} p={4}>
      <SStatsName sleeperId={sleeperId}/>
      <SStatsStatGroup SLog3={SLog3}/>
      
      <Grid
        templateAreas={{
          base: `'invest'
                 'graph1' 
                 'graph2'
                 'graph3'`,
          md: `'graph1 invest' 
               'graph2 invest'
               'graph3 invest'`
        }}
        gridTemplateRows={'auto'}
        gridTemplateColumns={'auto'}
        gap='3'
      >
        <GridItem area={'graph1'}>
          <Heading as='h2' size='md'>Sleep value</Heading>
          <SStatsGraph1 SLog1={SLog1}/>
        </GridItem>
        <GridItem area={'graph2'}>
          <Heading as='h2' size='md'>Sleep hours</Heading>
          <SStatsGraph2 SLog2={SLog2}/>
        </GridItem>
        <GridItem area={'graph3'}>
          <Heading as='h2' size='md'>Sleep times</Heading>
          <SStatsGraph3 SLog4={SLog4}/>
        </GridItem>
        <GridItem area={'invest'}>
          <HStack>
            <Button bg={'green.200'}>
              Buy
            </Button>
            <Button bg={'red.200'}>
              Sell
            </Button>
          </HStack>
        </GridItem>
      </Grid>
      

    </Container>
  )
};

export default SleeperStats