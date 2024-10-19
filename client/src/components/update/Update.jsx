import { useMutation, useQueryClient } from 'react-query';
import './update.scss';
import { AuthContext } from '../../context/authContext';
import { useContext, useState } from 'react';
import { makeRequest } from '../../axiosfunctions';

function Update({ setOpenUpdate, user }) {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState(user.name || '');
  const [city, setCity] = useState(user.city || '');
  const [website, setWebsite] = useState(user.website || '');
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    () => {
      const formData = new FormData();
      profilePic && formData.append('profilePic', profilePic);
      coverPic && formData.append('coverPic', coverPic);
      name && name != user.name && formData.append('name', name);
      city && city != user.city && formData.append('city', city);
      website && website != user.website && formData.append('website', website);

      return makeRequest.put('/users/update', formData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user', currentUser.username]);
        setName(user.name || '');
        setCity(user.city || '');
        setWebsite(user.website || '');
        setProfilePic(null);
        setCoverPic(null);

        setOpenUpdate(false);
      },
    }
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    if (profilePic || coverPic || name || city || website) mutation.mutate();
  };

  return (
    <div className='update'>
      <div className='main'>
        <span>Update user</span>
        {mutation.isLoading && 'Loading'}
        <input
          name=''
          id=''
          placeholder='Name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          disabled={mutation.isLoading}
        />
        <input
          type='file'
          name='profilePic'
          id=''
          accept='image/*'
          disabled={mutation.isLoading}
          onChange={(e) => {
            if (e.target.files[0].size <= 5242880)
              setProfilePic(e.target.files[0]);
            else {
              alert('Image size is limited to 5MB');
            }
          }}
        />
        <input
          type='file'
          name='coverPic'
          id=''
          accept='image/*'
          disabled={mutation.isLoading}
          onChange={(e) => {
            if (e.target.files[0].size <= 5242880)
              setCoverPic(e.target.files[0]);
            else {
              alert('Image size is limited to 5MB');
            }
          }}
        />
        <input
          name=''
          id=''
          placeholder='City'
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          disabled={mutation.isLoading}
        />
        <input
          name=''
          id=''
          placeholder='Website'
          value={website}
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
          disabled={mutation.isLoading}
        />
      </div>

      <div className='bottom'>
        <button
          onClick={() => setOpenUpdate(false)}
          disabled={mutation.isLoading}
        >
          Cancel
        </button>
        <button onClick={handleUpdate} disabled={mutation.isLoading}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Update;
