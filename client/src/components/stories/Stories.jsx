import { useContext } from 'react';
import './stories.scss';
import { AuthContext } from '../../context/authContext';

function Stories() {
  const { currentUser } = useContext(AuthContext);

  // Temporary
  const stories = [
    {
      id: 1,
      name: 'John Doe',
      img: '/static/city.jpg',
    },
    {
      id: 2,
      name: 'John Doe',
      img: '/static/city.jpg',
    },
    {
      id: 3,
      name: 'John Doe',
      img: '/static/city.jpg',
    },
    {
      id: 4,
      name: 'John Doe',
      img: '/static/city.jpg',
    },
    // {
    //   id: 5,
    //   name: 'John Doe',
    //   img: '/static/city.jpg',
    // },
    // {
    //   id: 6,
    //   name: 'John Doe',
    //   img: '/static/city.jpg',
    // },
  ];
  return (
    <div className='stories'>
      <div className='story'>
        <img src={currentUser.profilePic} alt='' />
        <span>{currentUser.name}</span>
        <button>+</button>
      </div>
      {stories.map((story) => {
        return (
          <div className='story' key={story.id}>
            <img src={story.img} alt='' />
            <span>{story.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Stories;
