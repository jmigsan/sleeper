import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';

import NavBar from './components/All/NavBar';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;