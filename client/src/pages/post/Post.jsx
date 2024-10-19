import { useParams } from 'react-router-dom';
import './post.scss';

function Post() {
  const { postId } = useParams();

  return <div className='postPage'>hello {postId}</div>;
}

export default Post;
