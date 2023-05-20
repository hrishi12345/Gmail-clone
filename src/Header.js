import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, IconButton } from '@mui/material';
import './Header.css'
import SearchIcon from '@mui/icons-material/Search';
import { ArrowDropDown } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import { useDispatch } from 'react-redux';
import { logout } from './features/userSlice';
function Header(){
  const dispatch=useDispatch()
  const logouthandler=()=>{
    dispatch(logout())
  }
    return(
        <div className="header">
          <div className='header__left'>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <img src='https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png' alt='gmail'></img>
          </div>
          <div className='header__middle'>
          <SearchIcon />
          <input placeholder='Search mail' type='text'></input>
          <ArrowDropDown />
          </div>
          <div className='header__right'>
            <IconButton>
           <HelpOutlineIcon />
           </IconButton>
           <IconButton>
            <SettingsIcon />
           </IconButton>
           <IconButton>
            <AppsIcon />
           </IconButton>
           <Avatar />
           <Button onClick={logouthandler}>Logout</Button>
          </div>
        </div >
    )
}
export default Header