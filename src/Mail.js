import React from 'react';
import { IconButton } from '@mui/material';
import './Mail.css';
import ArchiveIcon from '@mui/icons-material/Archive';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import LabelIcon from '@mui/icons-material/Label';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSelectedMail } from './features/mailSlice';
import Header from './Header';
import Sidebar from './Sidebar';


function Mail() {
  const navigate = useNavigate();
  const selectedMail = useSelector(selectSelectedMail);

  return (
    

    <div className="mail">
      <div className="mail__tools">
        <div className="mail__toolsLeft">
          <IconButton onClick={() => navigate('/')}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton>
            <ArchiveIcon />
          </IconButton>
          <IconButton>
            <ReportGmailerrorredIcon />
          </IconButton>
          <IconButton>
            <DeleteOutlineIcon />
          </IconButton>
          <IconButton>
            <MailOutlineIcon />
          </IconButton>
          <IconButton>
            <AccessTimeIcon />
          </IconButton>
          <IconButton>
            <AddTaskIcon />
          </IconButton>
          <IconButton>
            <DriveFileMoveIcon />
          </IconButton>
          <IconButton>
            <LabelIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="mail__body">
        <div className="mail__bodyHeader">
          <h2>{selectedMail?.subject}</h2>
          <p>{selectedMail?.title}</p>
          <p className="mail__time">{selectedMail?.time}</p>
        </div>
        <div className="mail__message">
          <p>{selectedMail?.description}</p>
        </div>
      </div>
    </div>

  );
}

export default Mail;
