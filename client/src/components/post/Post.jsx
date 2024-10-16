import './post.scss';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlined from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlined from '@mui/icons-material/TextsmsOutlined';
import ShareOutlined from '@mui/icons-material/ShareOutlined';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useState } from 'react';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axiosfunctions';

function Post({ postId, username }) {
  const [commentOpen, setCommentOpen] = useState(false);

  const {
    isLoading: postIsLoading,
    postError,
    data: post,
  } = useQuery(['posts', postId], async () => {
    let res = await makeRequest.post('/posts/post', { username, postId });
    return res.data;
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      const res = makeRequest.post('/likes/update', {
        liked: !post.liked,
        postId: post.id,
      });
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts', postId]);
      },
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (postIsLoading) return <span className='loading'>Loading...</span>;

  if (postError)
    return <span className='error'>Something's wrong. Try again</span>;

  return (
    <div className='post'>
      <div className='container'>
        <div className='user'>
          <div className='userInfo'>
            <Link
              to={`/profile/${post.username}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={post.profilePic} alt='' />
            </Link>

            <div className='details'>
              <Link
                to={`/profile/${post.username}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className='name'>{post.name}</span>
              </Link>
              <span className='date'>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHoriz />
        </div>
        <div className='content'>
          {post.description && (
            <p>
              <pre>{post.description.trim()}</pre>
            </p>
          )}
          {post.img && <img src={post.img} alt='' />}
        </div>
        <div className='info'>
          <div className='item' onClick={handleClick}>
            {post.liked ? (
              <FavoriteOutlined style={{ color: 'red' }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
            {post.likes} Likes
          </div>
          <div className='item' onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlined />
            Comments
          </div>
          <div className='item'>
            <ShareOutlined />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
}

export default Post;
