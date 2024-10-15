import { makeRequest } from '../../axiosfunctions';
import { useQuery } from 'react-query';
import Post from '../post/Post';
import './posts.scss';

function Posts() {
  const { isLoading, error, data } = useQuery(['homePosts'], async () => {
    const res = await makeRequest.get('/posts');
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
          return (
            <Post postId={post.id} username={post.username} key={post.id} />
          );
        })
      )}
    </div>
  );
}

export default Posts;
