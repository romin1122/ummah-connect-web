import Post from '../post/Post';
import { makeRequest } from '../../axiosfunctions';
import { useQuery } from 'react-query';
import './posts.scss';

function Posts({ userId }) {
  const { isLoading, error, data } = useQuery(['posts'], async () => {
    console.log({ userId });
    let res;
    if (userId) res = await makeRequest.get('/posts/user/' + userId);
    else res = await makeRequest.get('/posts');
    return res.data;
  });

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

export default Posts;
