import './postEditor.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useEffect, useState } from 'react';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { makeRequest } from '../../axiosfunctions';
import { useMutation, useQueryClient } from 'react-query';

function PostEditor() {
  const { currentUser } = useContext(AuthContext);

  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('description', description);

      return makeRequest.post('/posts/add', formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['homePosts']);
        setDescription('');
        setFile(null);
      },
    }
  );

  const handlePost = (e) => {
    e.preventDefault();
    if (file || description.trim()) mutation.mutate();
  };

  return (
    <div className='postEditor'>
      <div className='top'>
        <div className='left'>
          <img src={currentUser.profilePic} alt='' />
          <textarea
            name=''
            id=''
            placeholder="What's on your mind?"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            disabled={mutation.isLoading}
          ></textarea>
        </div>
        {file && (
          <div className='right'>
            <img
              src={URL.createObjectURL(file)}
              alt=''
              onClick={() => setFile(null)}
            />
          </div>
        )}
      </div>
      <hr />
      <div className='bottom'>
        <div className='left'>
          <div className='item'>
            <input
              type='file'
              accept='image/*'
              id='file'
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files[0].size <= 5242880)
                  setFile(e.target.files[0]);
                else {
                  alert('Image size is limited to 5MB');
                }
              }}
              disabled={mutation.isLoading}
            />
            <label htmlFor='file'>
              <AddPhotoAlternateOutlinedIcon />
              <span>Add image</span>
            </label>
          </div>
          <div className='item'>
            <LocationOnIcon />
            <span>Add place</span>
          </div>
          <div className='item'>
            <LocalOfferOutlinedIcon />
            <span>Tag friends</span>
          </div>
        </div>
        <div className='right'>
          <button onClick={handlePost} disabled={mutation.isLoading}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostEditor;
