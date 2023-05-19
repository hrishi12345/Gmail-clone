import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import './Sidebar.css';
import SidebarOption from "./SidebarOption";
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SendIcon from '@mui/icons-material/Send';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useDispatch } from "react-redux";
import { openSendMessage } from "./features/mailSlice";

function Sidebar() {
  const dispatch = useDispatch();

  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon fontSize="large" />}
        className="sidebar__compose"
        onClick={() => dispatch(openSendMessage())}
      >
        Compose
      </Button>
      <SidebarOption Icon={InboxIcon} title='Inbox' number={54} selected={true} />
      <SidebarOption Icon={StarBorderIcon} title='Starred' />
      <SidebarOption Icon={AccessTimeIcon} title='Snoozed' />
      <SidebarOption Icon={SendIcon} title='Sent' />
      <SidebarOption Icon={InsertDriveFileIcon} title='' number={20} />
    </div>
  );
}

export default Sidebar;
