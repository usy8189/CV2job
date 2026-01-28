import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home/home';
import LogoutMode from './components/logout_mode/LogoutMode';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogoutMode />} />
        <Route path="/home" element={<Home />} />
        {/* Redirect unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

