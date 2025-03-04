import './navBar.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const { darkMode, toggle } = useContext(DarkModeContext);

  return (
    <div className='navBar'>
      <div className='left'>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span>Ummah Connect</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />

        <div className='search'>
          <SearchOutlinedIcon />
          <input type='text' placeholder='Search...' />
        </div>
      </div>

      <div className='right'>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <Link
          to={`/profile/${currentUser.username}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className='user'>
            <img src={currentUser.profilePic} alt='' />
            <span>{currentUser.name}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
