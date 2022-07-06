import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Invest from './pages/Invest';

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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;