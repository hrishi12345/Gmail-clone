import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './Home.js';
import Form from './Form.js';
import Mail from './Mail.js';

function App() {
  const isLog = useSelector((state) => state.user.isLogin);

  return (
    <Router>
      <Routes>
        <Route path="/" element={isLog ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Form />} />
        <Route path="/mail" element={<Mail />} />
      </Routes>
    </Router>
  );
}

export default App;
