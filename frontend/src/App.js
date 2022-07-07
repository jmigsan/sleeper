import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Invest from './pages/Invest';
import SleeperStats from './pages/SleeperStats';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import NavBar from './components/All/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/invest" element={<Invest />} />
        <Route path="sleeper">
          <Route path=":sleeperId" element={<SleeperStats />} />
          <Route path="" element={<ErrorPage />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;