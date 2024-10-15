import './profile.scss';
import FacebookTwoTone from '@mui/icons-material/FacebookTwoTone';
import LinkedIn from '@mui/icons-material/LinkedIn';
import Instagram from '@mui/icons-material/Instagram';
import Pinterest from '@mui/icons-material/Pinterest';
import Twitter from '@mui/icons-material/Twitter';
import Place from '@mui/icons-material/Place';
import Language from '@mui/icons-material/Language';
import EmailOutlined from '@mui/icons-material/EmailOutlined';
import MoreVert from '@mui/icons-material/MoreVert';
import ProfilePosts from '../../components/profilePosts/ProfilePosts';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axiosfunctions';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import Update from '../../components/update/Update';

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const username = useLocation().pathname.split('/')[2];

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(['user', username], async () => {
    let res = await makeRequest.get('/users/find/' + username);
    return res.data;
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      const res = makeRequest.post('/relationships/update', {
        followed: !userData.followed,
        followedUsername: userData.username,
      });
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', username]);
      },
    }
  );

  const handleFollow = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setOpenUpdate(true);
  };

  if (isLoading) {
    // Just show an error dialog instead
    return <div className='profile'>Loading...</div>;
  }

  if (error) {
    // Just show an error dialog instead
    return (
      <div className='profile'>
        <div className='error'>
          <h1>{error.message}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className='profile'>
      <div className='images'>
        <img
          src={
            isLoading
              ? ''
              : userData.coverPic
              ? userData.coverPic
              : '/static/defaultCover.png'
          }
          alt=''
          className='cover'
        />
        <img
          src={isLoading ? '/static/defaultProfile.png' : userData.profilePic}
          alt=''
          className='profilePicture'
        />
      </div>

      <div className='profileContainer'>
        <div className='uInfo'>
          <div className='left'>
            <a href='http://facebook.com'>
              <FacebookTwoTone fontSize='large' />
            </a>
            <a href='http://facebook.com'>
              <Instagram fontSize='large' />
            </a>
            <a href='http://facebook.com'>
              <Twitter fontSize='large' />
            </a>
            <a href='http://facebook.com'>
              <LinkedIn fontSize='large' />
            </a>
            <a href='http://facebook.com'>
              <Pinterest fontSize='large' />
            </a>
          </div>
          <div className='center'>
            <span>{isLoading ? '...' : userData.name}</span>
            <div className='info'>
              <div className='item'>
                <Place />
                <span>
                  {!isLoading && userData.city ? userData.city : 'NA'}
                </span>
              </div>
              <div className='item'>
                <Language />
                <span>romin1122.dev</span>
              </div>
            </div>

            {currentUser.username != userData.username ? (
              <button
                onClick={handleFollow}
                disabled={isLoading || error || mutation.isLoading}
              >
                {isLoading || mutation.isLoading
                  ? '...'
                  : userData.followed
                  ? 'Unfollow'
                  : 'Follow'}
              </button>
            ) : (
              <button onClick={handleUpdate}>Update</button>
            )}
          </div>
          <div className='right'>
            <EmailOutlined />
            <MoreVert />
          </div>
        </div>

        <ProfilePosts username={username} />
      </div>

      {openUpdate && <Update setOpenUpdate={setOpenUpdate} />}
    </div>
  );
};

export default Profile;
