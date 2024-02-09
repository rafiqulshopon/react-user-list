import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users');
        setUsers(response.data.users || []);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='loader'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='p-5'>
      <h1 className='text-3xl font-bold underline mb-4'>User List</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {users.length > 0 ? (
          users.map((user) => <UserCard key={user.id} user={user} />)
        ) : (
          <p className='p-20'>No data found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
