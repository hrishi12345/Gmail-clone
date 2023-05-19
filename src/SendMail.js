import './SendMail.css';
import MinimizeIcon from '@mui/icons-material/Minimize';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { closeSendMessage } from './features/mailSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addEmailToFirestore } from './firebase';

function SendMail() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const from=useSelector(state=>state.user.email).replace('@gmail.com','')
  
  const onSubmit = (data) => {
    // Handle form submission
    const newdata={...data,from}
    
    addEmailToFirestore(newdata);
    dispatch(closeSendMessage());
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
    </div>
  );
}

export default SendMail;
