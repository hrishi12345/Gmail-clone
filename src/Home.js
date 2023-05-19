import React from 'react';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';

import EmailList from './EmailList';
import Mail from './Mail';
import Header from './Header';
import Sidebar from './Sidebar';
import './Home.css';
import SendMail from './SendMail';

function Home() {
  const sendMessage = useSelector((state) => state.mail.sendMessage);

  return (
    <div className="app">
      <Header />
      <div className="app__body">
        <Sidebar />
        <Routes>
          <Route path="/mail" element={<Mail />} />
          <Route path="/" element={<EmailList />} />
        </Routes>
      </div>
      {sendMessage && <SendMail />}
    </div>
  );
}

export default Home;
