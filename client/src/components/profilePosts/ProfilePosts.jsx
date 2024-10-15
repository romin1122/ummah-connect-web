import { makeRequest } from '../../axiosfunctions';
import { useQuery } from 'react-query';
import Post from '../post/Post';
import '../posts/posts.scss';

function ProfilePosts({ userId }) {
  const { isLoading, error, data } = useQuery(
    ['profilePosts', userId],
    async () => {
      const res = await makeRequest.get('/posts/user/' + userId);
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
          return <Post postId={post.id} userId={post.userId} key={post.id} />;
        })
      )}
    </div>
  );
}

export default ProfilePosts;
