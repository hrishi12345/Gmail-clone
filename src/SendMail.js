import './SendMail.css';
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { closeSendMessage } from './features/mailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function SendMail() {
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.user.email).replace('@gmail.com', '');
  const token = useSelector((state) => state.user.token);

  const onSubmit = (data) => {
    const id = uuidv4();
    const newMail = {id,...data, receiver, timestamp: new Date().toISOString() };
  
    console.log(token);
    console.log(newMail);
  
    fetch(`https://hris-9fdcd-default-rtdb.firebaseio.com/mails/${receiver}/${id}.json?auth=${token}`, {
      method: 'PUT',
      body: JSON.stringify(newMail)
    })
      .then(response => {
        if (response.ok) {
          console.log('Email added to Realtime Database successfully');
          dispatch(closeSendMessage());
        } else {
          throw new Error('Error adding email to Realtime Database');
        }
      })
      .catch(error => {
        console.error(error);
        setError('Error adding email to Realtime Database');
      });
  };

  return (
    <div className='sendMail'>
      <div className='sendMail__header'>
        <h3>New message</h3>
        <MinimizeIcon />
        <OpenInFullIcon />
        <CloseIcon onClick={() => dispatch(closeSendMessage())} className='sendMail__close' />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='email' placeholder='To' {...register('to', { required: true })} />
        {errors.to && <p className='sendMail__error'>To is required</p>}
        <input type='text' placeholder='Subject' {...register('subject', { required: true })} />
        <input type='text' className='sendMail_Message' {...register('message', { required: true })} />
        <div className='sendMail__options'>
          <Button
            className='sendMail__send'
            variant='contained'
            color='primary'
            type='submit'
          >
            Send
          </Button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default SendMail;
