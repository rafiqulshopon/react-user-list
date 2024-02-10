import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(response.data);
        setError('');
      } catch (error) {
        console.error('Error fetching user details: ', error);
        setError('No user found with the provided ID.');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='card w-96 md:w-1/2 lg:w-1/3 bg-base-100 shadow-xl p-5'>
        <div className='flex flex-col items-center'>
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className='w-48 h-48 rounded-full mb-4'
          />
          <h1 className='text-2xl md:text-4xl font-semibold'>{`${user.firstName} ${user.lastName}`}</h1>
          <p className='text-md md:text-lg mt-2'>Email: {user.email}</p>
          <p className='text-md md:text-lg mt-2'>
            Address: {user.address.address || ''}
          </p>
          <p className='text-md md:text-lg mt-2'>
            Company: {user.company.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
