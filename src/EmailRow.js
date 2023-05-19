import React, { useState } from 'react';
import './Emailrow.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selMail } from './features/mailSlice';
import { doc, updateDoc } from 'firebase/firestore';
import db from './firebase';

function EmailRow({ id, from, title, subject, description, time, read }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);

  const openMail = () => {
    dispatch(
      selMail({
        id,
        from,
        title,
        subject,
        description,
        time,
      })
    );
    navigate('/mail');

    const emailDocRef = doc(db, 'emails', id);
    updateDoc(emailDocRef, {
      status: 'read',
    })
      .then(() => {
        console.log('Email marked as read successfully');
      })
      .catch((error) => {
        console.error('Error marking email as read:', error);
      });

    setIsSelected(true);
  };

  return (
    <div
      className={`emailRow ${read ? '' : 'emailRow--unread'} ${isSelected ? 'emailRow--selected' : ''}`}
      onClick={openMail}
    >
      <div className='emailRow__options'>
        {!read && <div className='emailRow__dot' />}
      </div>
      <div className='emailRow__message'>
        <h4 className={`emailRow__title ${read ? '' : 'emailRow__title--bold'}`}>{title}</h4>
        <div className='emailRow__description'>
          <h5>
            {subject} <span className='emailRow__descriptionText'>({description})</span>
          </h5>
        </div>
      </div>
      <p className='emailRow__time'>{time}</p>
    </div>
  );
}

export default EmailRow;
