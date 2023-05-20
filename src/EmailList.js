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
import { useSelector } from 'react-redux';

function EmailList() {
  const [emails, setLoad] = useState([]);
  const token = useSelector((state) => state.user.token);
  const receiver = useSelector((state) => state.user.email).replace('@gmail.com', '');

  useEffect(() => {
    fetch(`https://hris-9fdcd-default-rtdb.firebaseio.com/mails/${receiver}.json?auth=${token}`)
      .then((response) => response.json())
      .then((data) => {
        const mailDataArray = Object.values(data || {});
        setLoad(mailDataArray.reverse());
      })
      .catch((error) => console.error(error));
  }, [receiver, token]);

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
        {emails.map((email, index) => (
          <EmailRow
            key={email.id}
            id={email.id}
            from={email.from}
            title={email.subject}
            subject={email.message}
            description={email.message}
            time={new Date(email.timestamp).toLocaleString()}
            index={emails.length - index - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default EmailList;
