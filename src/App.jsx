import { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/users')
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, []);

  return (
    <div className='p-5'>
      <h1 className='text-3xl font-bold underline mb-4'>User List</h1>
      <div className='flex flex-wrap justify-center gap-4'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default App;
