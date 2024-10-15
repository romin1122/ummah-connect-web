import PostEditor from '../../components/postEditor/PostEditor';
import Posts from '../../components/posts/Posts';
import Stories from '../../components/stories/Stories';
import './home.scss';

const Home = () => {
  return (
    <div className='home'>
      <Stories />
      <PostEditor />
      <Posts />
    </div>
  );
};

export default Home;
