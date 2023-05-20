import React, { useState } from 'react';
import './Emailrow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selMail } from './features/mailSlice';

function EmailRow({ id, from, title, subject, description, time, read }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(false);
  const receiver = useSelector((state) => state.user.email).replace('@gmail.com', '');
  const token = useSelector((state) => state.user.token);

  const openMail = () => {
    const selectedMailData = {
      id,
      title,
      subject,
      time,
      description,
    };
    dispatch(selMail(selectedMailData));
    navigate('/mail');
  };

  const deleteMail = () => {
    // Perform the delete operation
    fetch(`https://hris-9fdcd-default-rtdb.firebaseio.com/mails/${receiver}/${id}.json?auth=${token}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Email deleted successfully');
          // Update the UI or perform any other necessary actions
        } else {
          throw new Error('Error deleting email');
        }
      })
      .catch(error => {
        console.error(error);
        // Handle the error
      });
  };

  return (
    <>
    <button onClick={deleteMail}>Delete</button>
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
    </>
  );
}

export default EmailRow;
