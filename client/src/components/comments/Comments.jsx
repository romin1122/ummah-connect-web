import { useContext, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axiosfunctions';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Comments({ postId }) {
  const { currentUser } = useContext(AuthContext);

  const [description, setDescription] = useState('');

  const { isLoading, error, data } = useQuery(
    ['comments', postId],
    async () => {
      let res = await makeRequest.get('/comments?postId=' + postId);
      return res.data;
    }
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (commentData) => {
      return makeRequest.post('/comments/add', commentData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', postId]);
        setDescription('');
      },
    }
  );

  const handleClick = (e) => {
    e.preventDefault();
    mutation.mutate({ description, postId });
  };

  return (
    <div className='comments'>
      <div className='write'>
        <img src={currentUser.profilePic} alt='' />

        <textarea
          placeholder='Write a comment'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          disabled={mutation.isLoading}
        ></textarea>
        <button onClick={handleClick}>Send</button>
      </div>

      {isLoading
        ? 'Loading...'
        : error
        ? 'An error occured!'
        : data.map((comment) => (
            <div className='comment' key={comment.id}>
              <Link
                to={`/profile/${comment.username}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <img src={comment.profilePic} alt='' />
              </Link>
              <div className='info'>
                <Link
                  to={`/profile/${comment.username}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span>{comment.name}</span>
                </Link>
                <p>
                  <pre>{comment.description.trim()}</pre>
                </p>
              </div>
              <div className='date'>{moment(comment.createdAt).fromNow()}</div>
            </div>
          ))}
    </div>
  );
}

export default Comments;
