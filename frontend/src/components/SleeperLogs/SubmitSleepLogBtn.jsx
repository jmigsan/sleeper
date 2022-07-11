import {
  Button,
} from '@chakra-ui/react'

import axios from 'axios';

//firebase
import firebaseApp from "../../firebaseInit";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseApp);

const submitSleepLog = async (sleepyTime, wakeyTime) => {
  //console.log(`${sleepyTime} ${wakeyTime}`);
  //console.log(auth.currentUser.uid);

  try {
    let currentUserToken = await auth.currentUser.getIdToken(true);
    let idToken = currentUserToken;

    //console.log(idToken); <- fine

    const config = {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    };

    const userUid = auth.currentUser.uid;
    const SleepLogData = {sleepyTime, wakeyTime, userUid};

    //console.log(SleepLogData);

    const response = await axios.post('/api/createSleepLog', SleepLogData, config);
    //console.log(response.data);

  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    console.log(message);
  };
};

const SubmitSleepLogBtn = (props) => {
  if (!((props.sleepyTime == null) || (props.wakeyTime == null))) {
    return (
      <Button onClick={ () => submitSleepLog(props.sleepyTime, props.wakeyTime) }>Submit Log</Button>
    )
  }
  if (((props.sleepyTime == null) || (props.wakeyTime == null))) {
    return (
      <Button isLoading loadingText='Please input a time' spinner={null} spinnerPlacement='end'/>
    )
  }
}
export default SubmitSleepLogBtn