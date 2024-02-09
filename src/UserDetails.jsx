import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserDetails() {
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
    <div className='p-5'>
      <img
        src={user.image}
        alt={`${user.firstName} ${user.lastName}`}
        className='w-24 h-24 rounded-full'
      />
      <h1>{`${user.firstName} ${user.lastName}`}</h1>
      <p>Email: {user.email}</p>
      <p>Address: {`${user.address.address}, ${user.address.city}`}</p>
      <p>Company: {user.company.name}</p>
    </div>
  );
}

export default UserDetails;
