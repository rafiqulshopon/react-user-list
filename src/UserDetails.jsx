import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details: ', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div className='p-5 flex flex-col items-center'>
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        className='w-32 h-32 md:w-48 md:h-48 rounded-full'
      />
      <h1 className='text-xl md:text-3xl'>{`${user.firstName} ${user.lastName}`}</h1>
      <p className='text-sm md:text-base'>Email: {user.email}</p>
      <p className='text-sm md:text-base'>
        Address: {user.address.address || ''}
      </p>
      <p className='text-sm md:text-base'>Company: {user.company.name}</p>
    </div>
  );
};

export default UserDetails;
