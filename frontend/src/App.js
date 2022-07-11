import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Invest from './pages/Invest';
import SleeperStats from './pages/SleeperStats';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import SleeperLogs from './pages/SleeperLogs';

import NavBar from './components/All/NavBar';

//firebase things
import firebaseApp from './firebaseInit'
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
const auth = getAuth(firebaseApp);

function App() {
  //firebase things
  const [user] = useAuthState(auth);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/sleeperlogs"
          element={
            !user ? (
              <Navigate replace to="/signin" />
            ) : (
              <SleeperLogs />
            )
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="sleeper">
          <Route path=":sleeperId" element={<SleeperStats />} />
          <Route path="" element={<ErrorPage />} />
        </Route>
        <Route
          path="/signin"
          element={
            user ? (
              <Navigate replace to="/dashboard" />
            ) : (
              <SignIn />
            )
          }
        />
        <Route
          path="/signup"
          element={
            user ? (
              <Navigate replace to="/dashboard" />
            ) : (
              <SignUp />
            )
          }
        />
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;