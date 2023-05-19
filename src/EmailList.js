
import React, { useEffect, useState } from 'react';
import './EmailList.css';
import { IconButton } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import Section from './Section';
import EmailRow from './EmailRow';
import db from './firebase';
import { collection, onSnapshot, orderBy, query, updateDoc, doc } from 'firebase/firestore';

function EmailList() {
  const [emails, setEmails] = useState([]);
  const [selectedEmailId, setSelectedEmailId] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'emails'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        const fetchedEmails = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEmails(fetchedEmails);
      }
    );

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);

  const markAsRead = (emailId) => {
    // Update the 'status' field of the email document to 'read'
    const emailRef = doc(db, 'emails', emailId);
    updateDoc(emailRef, { status: 'read' })
      .then(() => {
        setSelectedEmailId(emailId);
        console.log('Email marked as read successfully');
      })
      .catch((error) => {
        console.error('Error marking email as read:', error);
      });
  };

  return (
    <div className='emailList'>
      <div className='emailList__settings'>
        <div className='emailList__settingsLeft'>
          <IconButton>
            <CheckBoxOutlineBlankIcon />
          </IconButton>
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className='emailList__settingsRight'>
          <IconButton>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton>
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
      </div>
      <div className='emailList__sections'>
        <Section Icon={InboxIcon} title='Primary' color='lightskyblue' selected />
        <Section Icon={LocalOfferIcon} title='Promotions' />
        <Section Icon={PeopleAltIcon} title='Social' />
      </div>
      <div className='emailList__list'>
        {emails.map((email) => (
          <EmailRow
            key={email.id}
            id={email.id}
            from={email.from}
            title={email.subject}
            subject={email.message}
            description={email.from}
            time={new Date(email.timestamp).toLocaleString()}
            read={email.status === 'read'}
            isSelected={selectedEmailId === email.id}
            onClick={() => markAsRead(email.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default EmailList;
