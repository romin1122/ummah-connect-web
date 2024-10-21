import { makeRequest } from '../../axiosfunctions';
import { useQuery } from 'react-query';
import Post from '../post/Post';
import '../posts/posts.scss';

function ProfilePosts({ username }) {
  const { isLoading, error, data } = useQuery(
    ['profilePosts', username],
    async () => {
      const res = await makeRequest.get('/posts/user/' + username);
      return res.data;
    }
  );

  return (
    <div className='posts'>
      {isLoading ? (
        <span className='loading'>Loading...</span>
      ) : error ? (
        <div className='error'>{error}</div>
      ) : (
        data.map((post) => {
          return <Post postUuid={post.uuid} key={post.uuid} />;
        })
      )}
    </div>
  );
}

export default ProfilePosts;
